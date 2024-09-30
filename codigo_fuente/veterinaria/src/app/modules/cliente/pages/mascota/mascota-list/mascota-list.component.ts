import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthJWTService } from '../../../../../core/services/auth.service';
import { MensajesService } from '../../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../../utils/form-validation-utils';
import { ClienteService } from '../../../services/cliente.service';
import { MascotaService } from '../../../services/mascota.service';

@Component({
  selector: 'app-mascota-list',
  templateUrl: './mascota-list.component.html',
  styleUrl: './mascota-list.component.css'
})
export class MascotaListComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;

  displayedColumns: string[] = ['nro', 'nombre', 'edad', 'peso', 'raza', 'descripcion', 'acciones'];
  data: any[] = [];

  cliente: any = null;

  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private formBuilder: FormBuilder,

    private mascotaService: MascotaService,
    private clienteService: ClienteService,
    private authService: AuthJWTService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.onLoad();
  }

  onLoad() {

    const info = this.authService.getInfoUsuario();

    this.mensaje.showLoading();
    this.clienteService.find({ id: info?.id }).subscribe({
      next: (res: any) => {
        this.cliente = res;
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

  initForm(): void {
    this.form = this.formBuilder.group({
      filter: [
        '', [],
      ],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);
  }

  onListar() {
    const filter = this.form.controls['filter'].value;

    this.mensaje.showLoading();
    this.mascotaService.list(this.cliente?.id, filter).subscribe({
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
    this.router.navigate(['cliente/mascota/add']);
  }

  onEditar(id: any) {
    this.router.navigate(['cliente/mascota/edit', id]);
  }

  onVerHistorial(id: any) {
    this.router.navigate(['cliente/mascota/historial', id]);
  }

}
