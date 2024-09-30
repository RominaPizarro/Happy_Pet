import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../cliente/services/cita.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajesService } from '../../../../core/services/mensajes.service';
import { HistorialService } from '../../../cliente/services/historial.service';
import { MascotaService } from '../../../cliente/services/mascota.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationUtils } from '../../../../utils/form-validation-utils';

@Component({
  selector: 'app-atender',
  templateUrl: './atender.component.html',
  styleUrl: './atender.component.css'
})
export class AtenderComponent implements OnInit {

  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  data: any[] = [];

  cita: any = {};

  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

    private historialService: HistorialService,
    private mascotaService: MascotaService,
    private citaService: CitaService,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.cita.id = params.get('id');
    });

    this.onLoad();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      descripcion: [
        null, [Validators.required],
      ],
      observaciones: [
        null, [],
      ],
      receta: [
        null, [],
      ],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);

  }

  onLoad(): void {
    if (!this.cita?.id) {
      return;
    }

    this.initForm();

    this.mensaje.showLoading();
    this.citaService.find({ id: this.cita?.id }).subscribe({
      next: (res: any) => {
        this.cita = res;
      },
      error: (err) => {
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () => {
        this.mensaje.closeLoading();
        this.onListar();
      }
    });
  }

  onListar() {

    if (!this.cita?.mascota?.id) {
      return;
    }

    this.mensaje.showLoading();
    this.historialService.list(this.cita?.mascota?.id).subscribe({
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dato = {
      descripcion: this.form.controls['descripcion'].value,
      observaciones: this.form.controls['observaciones'].value,
      receta: this.form.controls['receta'].value,
      mascota: this.cita.mascota,
      fecha: new Date(),
    };

    this.mensaje.showLoading();

    this.historialService.add(dato).subscribe({
      next: (res: any) => {
        this.mensaje.showMessageSuccess('Se agregó el resultado de la atención');
        this.onListar();
        this.initForm();
      },
      error: (err) => {
        this.mensaje.showMessageErrorObservable(err);
      },
    });

  }

  onCancelar() {
    this.router.navigate(['veterinario/cita/list']);
  }

}
