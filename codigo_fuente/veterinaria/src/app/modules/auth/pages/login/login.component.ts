import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from '../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../utils/form-validation-utils';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mensaje: MensajesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      codigoUsuario: [
        'admin',
        [Validators.required, Validators.maxLength(30)],
      ],
      password: ['admin', [Validators.required, Validators.minLength(5)]],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);
  }

  onLogin(): void {
    if (this.form.invalid) {
      for (const control of Object.keys(this.form.controls)) {
        this.form.controls[control].markAsTouched();
      }
      return;
    }

    const codigoUsuario = this.form.get('codigoUsuario')?.value;
    const password = this.form.get('password')?.value;

    const dato = {
      username: codigoUsuario,
      password: password,
    };

    this.authService.login(dato).subscribe({
      next: (res) => {
        const rol = res[0].rol;
        localStorage.setItem('sesion', JSON.stringify(res[0]));
        localStorage.setItem('username', res[0].username);
        localStorage.setItem('rol', rol);
        localStorage.setItem('jwtToken', res[1]);

        let menu = {};

        if(rol == 'ADMINISTRADOR'){
          menu = [
            {
              url: 'admin/usuario/list',
              icon: 'group',
              title: 'Gestionar Usuarios',
            },
            {
              url: 'admin/veterinario/list',
              icon: 'bloodtype',
              title: 'Gestionar Veterinarios',
            },
            {
              url: 'admin/veterinario/list',
              icon: 'list_alt',
              title: 'Generar Reportes',
            },
          ];
          this.router.navigate(['admin']);
          localStorage.setItem('menu-admin', JSON.stringify(menu));
        }else if (rol == 'VETERINARIO'){
          menu = [
            {
              url: 'veterinario/usuario/list',
              icon: 'group',
              title: 'Gestionar Usuarios',
            },
          ];
          this.router.navigate(['veterinario']);
          localStorage.setItem('menu-veterinario', JSON.stringify(menu));
        }else if(rol == 'CLIENTE'){
          menu = [
            {
              url: 'cliente/mascota/list',
              icon: 'pets',
              title: 'Gestionar Mascotas',
            },
            {
              url: 'cliente/cita/list',
              icon: 'list',
              title: 'Mis Citas',
            },
            {
              url: 'cliente/cita/add',
              icon: 'favorite',
              title: 'Reservar Cita',
            },
          ];
          this.router.navigate(['cliente']);
          localStorage.setItem('menu-cliente', JSON.stringify(menu));
        }
      },
      error: (err) => {
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () => {},
    });
  }


  onKeyEnter(event: any): void{
    if(event.charCode == 13){
      this.onLogin();
    }
  }

  onRegister(): void{
    this.router.navigate(['auth/register']);
  }
}
