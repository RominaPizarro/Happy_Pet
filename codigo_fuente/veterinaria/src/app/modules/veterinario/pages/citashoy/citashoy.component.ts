import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthJWTService } from '../../../../core/services/auth.service';
import { MensajesService } from '../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../utils/form-validation-utils';
import { CitaService } from '../../../cliente/services/cita.service';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { Router } from '@angular/router';
import { VeterinarioService } from '../../../admin/services/veterinario.service';

@Component({
  selector: 'app-citashoy',
  templateUrl: './citashoy.component.html',
  styleUrl: './citashoy.component.css'
})
export class CitashoyComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;

  displayedColumns: string[] = ['nro', 'fecharegistro', 'veterinario', 'mascota', 'horario', 'cancelado', 'acciones'];
  data: any[] = [];
  veterinario: any = null;


  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private formBuilder: FormBuilder,

    private authService: AuthJWTService,
    private citaService: CitaService,
    private veterinarioService: VeterinarioService,
  ) { }

  ngOnInit(): void {
    this.onLoad();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      filter: [
        null, [Validators.required],
      ],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);

  }

  onLoad() {

    this.initForm();

    const info = this.authService.getInfoUsuario();

    this.mensaje.showLoading();
    this.veterinarioService.findByUsuario({ id: info?.id }).subscribe({
      next: (res: any) => {
        this.veterinario = res;
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
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const dato = {
      fechaRegistro: this.form.controls['filter'].value
    }

    this.mensaje.showLoading();
    this.citaService.listByVeterinario(this.veterinario?.id, dato).subscribe({
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

  compareDate(date: string): boolean{
    const now = new Date();
    return date.substring(0,10) == now.toISOString().substring(0,10);
  }

  convertToLocalDate(fecha: string): string {
    return fecha.substring(0, 10);
  }

  onAtender(item: any) {
    this.router.navigate(['veterinario/cita/atender', item.id]);
  }
}

