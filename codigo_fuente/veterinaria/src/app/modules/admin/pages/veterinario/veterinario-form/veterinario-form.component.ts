import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajesService } from '../../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../../utils/form-validation-utils';
import { VeterinarioService } from '../../../services/veterinario.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-veterinario-form',
  templateUrl: './veterinario-form.component.html',
  styleUrl: './veterinario-form.component.css'
})
export class VeterinarioFormComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;
  veterinario: any = {};
  usuario: any = {};

  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

    private veterinarioService: VeterinarioService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.veterinario.id = params.get('id');
    });

    this.onload();
  }

  onload(){
    this.initForm();

    if(this.veterinario.id){
      this.mensaje.showLoading();
      const dato = {id: this.veterinario.id};
      this.veterinarioService.find(dato).subscribe({
        next: (res: any) => {
          this.veterinario = res;
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
        complete: () =>{
          this.mensaje.closeLoading();
          this.findUsuario();
        }
      });
    }
  }

  findUsuario(){
    if(this.veterinario){

      const dato = {id: this.veterinario?.usuario.id};
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
      identificacion: [
        this.veterinario?.identificacion, [Validators.required],
      ],
      nombres: [
        this.veterinario?.nombres, [Validators.required],
      ],
      apellidos: [
        this.veterinario?.apellidos, [Validators.required],
      ],
      especialidad: [
        this.veterinario?.especialidad, [Validators.required],
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
      rol: 'VETERINARIO',
    };

    this.mensaje.showLoading();

    if(this.usuario?.id != null){
      this.usuarioService.edit(dato).subscribe({
        next: (res: any) => {
          this.usuario = res;
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
        complete: ()=>{
          this.mensaje.closeLoading();
          this.onGuardarVeterinario();
        }
      });
    }else{
      this.usuarioService.add(dato).subscribe({
        next: (res: any) => {
          this.usuario = res;
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
        complete: ()=>{
          this.mensaje.closeLoading();
          this.onGuardarVeterinario();
        }
      });
    }
  }

  onGuardarVeterinario(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const dato = {
      id: this.veterinario?.id,
      nombres: this.form.controls['nombres'].value,
      apellidos: this.form.controls['apellidos'].value,
      email: this.form.controls['email'].value,
      especialidad: this.form.controls['especialidad'].value,
      identificacion: this.form.controls['identificacion'].value,
      telefono: this.form.controls['telefono'].value,
      usuario: this.usuario,
    };

    this.mensaje.showLoading();

    if(this.veterinario?.id != null){
      this.veterinarioService.edit(dato).subscribe({
        next: (res: any) => {
          this.mensaje.showMessageSuccess('Veterinario actualizado');
          this.router.navigate(['admin/veterinario/list']);
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
      });
    }else{
      this.veterinarioService.add(dato).subscribe({
        next: (res: any) => {
          this.mensaje.showMessageSuccess('Veterinario registrado');
          this.router.navigate(['admin/veterinario/list']);
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
      });
    }
  }

  onCancelar(){
    this.router.navigate(['admin/veterinario/list']);
  }
}
