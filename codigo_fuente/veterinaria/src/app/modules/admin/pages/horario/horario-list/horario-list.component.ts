import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesService } from '../../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../../utils/form-validation-utils';
import { VeterinarioService } from '../../../services/veterinario.service';
import { forkJoin, map } from 'rxjs';
import { ProgramacionService } from '../../../services/programacion.service';
import { HorarioService } from '../../../services/horario.service';

@Component({
  selector: 'app-horario-list',
  templateUrl: './horario-list.component.html',
  styleUrl: './horario-list.component.css'
})
export class HorarioListComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;

  displayedColumns: string[] = ['nro', 'horaInicio', 'horaFin', 'acciones'];
  data: any = [];

  veterinario: any = {};
  horarios: any = [];
  programaciones: any = [];

  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

    private veterinarioService: VeterinarioService,
    private programacionService: ProgramacionService,
    private horarioService: HorarioService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.veterinario.id = params.get('id');
    });

    this.onLoad();
  }

  onLoad(){
    this.initForm();

    this.mensaje.showLoading();
    forkJoin({
      listProgramaciones: this.programacionService.list(),
      listHorarios: this.horarioService.list(this.veterinario?.id),
      veterinario: this.veterinarioService.find(this.veterinario)
    })
      .pipe(
        map((res) => {
          this.programaciones = res.listProgramaciones;
          this.data = res.listHorarios;
          this.veterinario = res.veterinario;
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
      programacion: [
        null, [Validators.required],
      ],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);

  }

  onListar() {
    this.mensaje.showLoading();
    this.horarioService.list(this.veterinario?.id).subscribe({
      next: (res: any) => {
        this.data = res;
      },
      error: (err) => {
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () => {
        this.mensaje.closeLoading();
      }
    });
  }

  onGuardar() {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const dato = {
      veterinario: this.veterinario,
      programacion: this.form.controls['programacion'].value,
    };

    this.horarioService.add(dato).subscribe({
      next: (res: any) => {
        this.mensaje.showMessageSuccess('Se asignó el horario correctamente');
        this.initForm();
      },
      error: (err) => {
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () => {
        this.onListar();
      }
    });
  }

  onEliminar(id: any) {

    const confirmation = this.mensaje.crearConfirmacion('¿Desea eliminar el registro?')
    confirmation.componentInstance.onSi.subscribe((data) => {
      const dato = { id: id }
      this.mensaje.showLoading();
      this.horarioService.delete(dato).subscribe({
        next: (res: any) => {
          this.mensaje.showMessageSuccess('Horario eliminado del veterinario');
        },
        error: (err) => {
          this.mensaje.showMessageErrorObservable(err);
        },
        complete: () => {
          this.mensaje.closeLoading();
          this.onListar();
        }
      });
    });
  }
}
