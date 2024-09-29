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
        'ADMINSDEF',
        [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
      ],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
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
      codigoUsuario: codigoUsuario,
      password: password,
    };

    this.authService.login(dato).subscribe({
      next: (res) => {
        localStorage.setItem('username', `${codigoUsuario}`);
        localStorage.setItem('token', res.token);
        localStorage.setItem('jwtToken', res.accessToken);

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

  onInvitado(): void{
    this.router.navigate(['client/mi-sede-mas-cercana']);
  }
}
