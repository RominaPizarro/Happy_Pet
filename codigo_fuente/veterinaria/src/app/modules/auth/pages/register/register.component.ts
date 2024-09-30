import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajesService } from '../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../utils/form-validation-utils';
import { UsuarioService } from '../../../admin/services/usuario.service';
import { VeterinarioService } from '../../../admin/services/veterinario.service';
import { ClienteService } from '../../../cliente/services/cliente.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;
  veterinario: any = {};
  usuario: any = {};

  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private formBuilder: FormBuilder,

    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      identificacion: [
        this.veterinario?.identificacion, [Validators.required],
      ],
      nombres: [
        this.veterinario?.nombres, [Validators.required],
      ],
      apellidos: [
        this.veterinario?.apellidos, [Validators.required],
      ],
      direccion: [
        this.veterinario?.direccion, [Validators.required],
      ],
      email: [
        this.veterinario?.email, [],
      ],
      telefono: [
        this.veterinario?.telefono, [],
      ],
      username: [
        this.veterinario?.username, [Validators.required, Validators.minLength(5)],
      ],
      password: [
        this.veterinario?.password, [Validators.required, Validators.minLength(5)],
      ],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);

  }

  onGuardarUsuario(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const dato = {
      id: this.usuario?.id,
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
      rol: 'CLIENTE',
    };

    this.mensaje.showLoading();

      this.usuarioService.add(dato).subscribe({
        next: (res: any) => {
          this.usuario = res;
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
        complete: ()=>{
          this.mensaje.closeLoading();
          this.onGuardarCliente();
        }
      });

  }

  onGuardarCliente(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const dato = {
      id: this.veterinario?.id,
      nombres: this.form.controls['nombres'].value,
      apellidos: this.form.controls['apellidos'].value,
      email: this.form.controls['email'].value,
      direccion: this.form.controls['direccion'].value,
      identificacion: this.form.controls['identificacion'].value,
      telefono: this.form.controls['telefono'].value,
      usuario: this.usuario,
    };

    this.mensaje.showLoading();

      this.clienteService.add(dato).subscribe({
        next: (res: any) => {
          this.mensaje.showMessageSuccess('Cliente registrado');
          this.router.navigate(['auth/login']);
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
      });
  }

  onCancelar(){
    this.router.navigate(['auth/login']);
  }
}

