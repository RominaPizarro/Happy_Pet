import { AuthJWTService } from './../../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajesService } from '../../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../../utils/form-validation-utils';
import { ClienteService } from '../../../services/cliente.service';
import { MascotaService } from '../../../services/mascota.service';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrl: './mascota-form.component.css'
})
export class MascotaFormComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;
  mascota: any = {};
  cliente: any = {};

  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

    private mascotaService: MascotaService,
    private clienteService: ClienteService,
    private authService: AuthJWTService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.mascota.id = params.get('id');
    });

    this.onload();
  }

  onload(){
    this.initForm();

    if(this.mascota.id){
      this.mensaje.showLoading();
      const dato = {id: this.mascota.id};
      this.mascotaService.find(dato).subscribe({
        next: (res: any) => {
          this.mascota = res;
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

    const info = this.authService.getInfoUsuario();
    this.clienteService.find({id: info?.id}).subscribe({
      next: (res: any) => {
        this.cliente = res;
      },
      error: (err) =>{
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () =>{
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      descripcion: [
        this.mascota?.descripcion, [],
      ],
      edad: [
        this.mascota?.edad, [Validators.required, Validators.min(0)],
      ],
      nombre: [
        this.mascota?.nombre, [Validators.required],
      ],
      peso: [
        this.mascota?.peso, [Validators.required, Validators.min(0)],
      ],
      raza: [
        this.mascota?.raza, [],
      ],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);

  }

  onGuardarMascota(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const dato = {
      id: this.mascota?.id,
      descripcion: this.form.controls['descripcion'].value,
      edad: this.form.controls['edad'].value,
      nombre: this.form.controls['nombre'].value,
      peso: this.form.controls['peso'].value,
      raza: this.form.controls['raza'].value,
      cliente: this.cliente,
    };

    this.mensaje.showLoading();

    if(this.mascota?.id != null){
      this.mascotaService.edit(dato).subscribe({
        next: (res: any) => {
          this.mensaje.showMessageSuccess('Mascota actualizado');
          this.router.navigate(['cliente/mascota/list']);
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
      });
    }else{
      this.mascotaService.add(dato).subscribe({
        next: (res: any) => {
          this.mensaje.showMessageSuccess('Mascota registrado');
          this.router.navigate(['cliente/mascota/list']);
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
      });
    }
  }

  onCancelar(){
    this.router.navigate(['cliente/mascota/list']);
  }
}
