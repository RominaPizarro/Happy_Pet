import { Component, OnInit } from '@angular/core';
import { VeterinarioService } from '../../../../admin/services/veterinario.service';
import { HorarioService } from '../../../../admin/services/horario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthJWTService } from '../../../../../core/services/auth.service';
import { MensajesService } from '../../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../../utils/form-validation-utils';
import { ClienteService } from '../../../services/cliente.service';
import { MascotaService } from '../../../services/mascota.service';
import { forkJoin, map } from 'rxjs';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrl: './cita-form.component.css'
})
export class CitaFormComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;
  cita: any = {};
  cliente: any = {};

  mascotas: any = [];
  veterinarios: any = [];
  horarios: any = [];

  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService,
    private horarioService: HorarioService,
    private citaService: CitaService,
    private clienteService: ClienteService,
    private authService: AuthJWTService
  ) {}

  ngOnInit(): void {
    this.onload();
  }

  onload(){
    this.initForm();

    const info = this.authService.getInfoUsuario();
    this.clienteService.find({id: info?.id}).subscribe({
      next: (res: any) => {
        this.cliente = res;
      },
      error: (err) =>{
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () =>{
        this.onLoadData();
      }
    });
  }

  onLoadData(){
    if(!this.cliente?.id){
      return;
    }

    this.mensaje.showLoading();
    forkJoin({
      listVeterinarios: this.veterinarioService.list(''),
      listMascotas: this.mascotaService.list(this.cliente?.id, ''),
    })
      .pipe(
        map((res) => {
          this.mascotas = res.listMascotas;
          this.veterinarios = res.listVeterinarios;
        })
      )
      .subscribe({
        next: (res) => {
          this.mensaje.closeLoading();
        },
        error: (err) => {
          this.mensaje.showMessageErrorObservable(err);
        },
      });

  }

  initForm(): void {
    this.form = this.formBuilder.group({
      fecha: [
        this.cita?.fecha, [Validators.required],
      ],
      mascota: [
        this.cita?.mascota, [Validators.required],
      ],
      veterinario: [
        this.cita?.veterinario, [Validators.required],
      ],
      horario: [
        this.cita?.horario, [Validators.required],
      ],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);

  }

  onListHorario(veterinario: any){
    this.mensaje.showLoading();
    this.horarioService.list(veterinario?.id).subscribe({
      next: (res) => {
        console.log(res)
        this.horarios = res;
      },
      error: (err) => {
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () =>{
        this.mensaje.closeLoading();
      }
    });
  }

  onGuardarMascota(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const dato = {
      id: null,
      fechaRegistro: this.form.controls['fecha'].value,
      horario: this.form.controls['horario'].value,
      veterinario: this.form.controls['veterinario'].value,
      mascota: this.form.controls['mascota'].value,
      cancelado: 0,
    };

    this.mensaje.showLoading();

      this.citaService.add(dato).subscribe({
        next: (res: any) => {
          this.mensaje.showMessageSuccess('Mascota registrado');
          this.router.navigate(['cliente/cita/list']);
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
      });
  }

  onCancelar(){
    this.router.navigate(['cliente/cita/list']);
  }
}
