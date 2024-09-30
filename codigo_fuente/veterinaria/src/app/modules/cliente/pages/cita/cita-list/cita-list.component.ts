import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthJWTService } from '../../../../../core/services/auth.service';
import { MensajesService } from '../../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../../utils/form-validation-utils';
import { ClienteService } from '../../../services/cliente.service';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  styleUrl: './cita-list.component.css'
})
export class CitaListComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;

  displayedColumns: string[] = ['nro', 'fecharegistro', 'veterinario', 'mascota', 'horario', 'cancelado', 'acciones'];
  data: any[] = [];
  cliente: any = null;


  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private formBuilder: FormBuilder,

    private clienteService: ClienteService,
    private authService: AuthJWTService,
    private citaService: CitaService,
  ) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {

    const info = this.authService.getInfoUsuario();
    console.log(info)

    this.mensaje.showLoading();
    this.clienteService.find({ id: info?.id }).subscribe({
      next: (res: any) => {
        this.cliente = res;
      },
      error: (err) => {
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () => {
        console.log(this.cliente)
        this.mensaje.closeLoading();
        this.onListar();
      }
    });
  }

  onListar() {
    this.mensaje.showLoading();
    this.citaService.list(this.cliente?.id).subscribe({
      next: (res: any) => {
        console.log('citas',res)
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

  compareDate(date: any): boolean{
    const now = new Date();
    return date > now.toISOString();
  }

  convertToLocalDate(fecha: string): string {
    return fecha.substring(0, 10);
  }

  onCancelar(item: any) {
    const confirmation = this.mensaje.crearConfirmacion('¿Desea CANCELAR la cita?')
    confirmation.componentInstance.onSi.subscribe((data) => {
      const dato = { id: item.id }
      this.mensaje.showLoading();
      this.citaService.delete(dato).subscribe({
        next: (res: any) => {
          this.mensaje.showMessageSuccess('Cita cancelada');
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
