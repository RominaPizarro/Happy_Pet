import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesService } from '../../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../../utils/form-validation-utils';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;
  usuario: any = {};

  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.usuario.id = params.get('id');
    });

    this.onload();
  }

  onload(){
    this.initForm();

    if(this.usuario.id){
      this.mensaje.showLoading();
      const dato = {id: this.usuario.id};
      this.usuarioService.find(dato).subscribe({
        next: (res: any) => {
          this.usuario = res;
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
        complete: () =>{
          this.mensaje.closeLoading();
          this.initForm();
        }
      });
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      username: [
        this.usuario?.username, [Validators.required, Validators.minLength(5)],
      ],
      password: [
        this.usuario?.password, [Validators.required, Validators.minLength(5)],
      ],
      rol: [
        this.usuario?.rol, [Validators.required],
      ],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);

  }

  onGuardar(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const dato = {
      id: this.usuario?.id,
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
      rol: this.form.controls['rol'].value,
    };

    this.mensaje.showLoading();

    if(this.usuario?.id != null){
      this.usuarioService.edit(dato).subscribe({
        next: (res: any) => {
          this.mensaje.showMessageSuccess('Usuario actualizado');
          this.router.navigate(['admin/usuario/list']);
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
      });
    }else{
      this.usuarioService.add(dato).subscribe({
        next: (res: any) => {
          this.mensaje.showMessageSuccess('Usuario registrado');
          this.router.navigate(['admin/usuario/list']);
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
      });
    }
  }

  onCancelar(){
    this.router.navigate(['admin/usuario/list']);
  }
}
