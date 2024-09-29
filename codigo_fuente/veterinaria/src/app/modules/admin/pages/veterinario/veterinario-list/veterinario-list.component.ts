import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from '../../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../../utils/form-validation-utils';
import { VeterinarioService } from '../../../services/veterinario.service';

@Component({
  selector: 'app-veterinario-list',
  templateUrl: './veterinario-list.component.html',
  styleUrl: './veterinario-list.component.css'
})
export class VeterinarioListComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;

  displayedColumns: string[] = ['nro', 'identificacion', 'nombres', 'apellidos', 'especialidad', 'email', 'telefono', 'username', 'acciones'];
  data: any[] = [];

  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private formBuilder: FormBuilder,

    private veterinarioService: VeterinarioService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      filter: [
        '', [],
      ],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);

    this.onListar();
  }

  onListar() {
    const filter = this.form.controls['filter'].value;

    this.mensaje.showLoading();
    this.veterinarioService.list(filter).subscribe({
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

  onNuevo() {
    this.router.navigate(['admin/veterinario/add']);
  }

  onEditar(id: any) {
    this.router.navigate(['admin/veterinario/edit', id]);
  }

  onHorario(id: any) {
    this.router.navigate(['admin/veterinario/horario', id]);
  }

  onEliminar(id: any) {

    const confirmation = this.mensaje.crearConfirmacion('¿Desea eliminar el registro?')
    confirmation.componentInstance.onSi.subscribe((data) => {
      const dato = { id: id }
      this.mensaje.showLoading();
      this.veterinarioService.delete(dato).subscribe({
        next: (res: any) => {
          this.mensaje.showMessageSuccess('Veterinario eliminado');
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
