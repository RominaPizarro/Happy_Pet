import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from '../../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../../utils/form-validation-utils';
import { AuthService } from '../../../../auth/services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;

  displayedColumns: string[] = ['nro', 'username', 'rol', 'acciones'];
  data: any[] = [];

  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private formBuilder: FormBuilder,

    private usuarioService: UsuarioService
  ) {}

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

  onListar(){
    const filter = this.form.controls['filter'].value;

    this.mensaje.showLoading();
    this.usuarioService.list(filter).subscribe({
      next: (res: any) => {
        this.data = res;
      },
      error: (err) =>{
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () =>{
        this.mensaje.closeLoading();
      }
    });
  }

  onNuevo(){
    this.router.navigate(['admin/usuario/add']);
  }

  onEditar(id: any){
    this.router.navigate(['admin/usuario/edit', id]);
  }

  onEliminar(id: any) {

    const confirmation = this.mensaje.crearConfirmacion('¿Desea eliminar el registro?')
    confirmation.componentInstance.onSi.subscribe((data) => {
      const dato = {id: id}
      this.mensaje.showLoading();
      this.usuarioService.delete(dato).subscribe({
        next: (res: any) => {
          this.mensaje.showMessageSuccess('Usuario eliminado');
        },
        error: (err) =>{
          this.mensaje.showMessageErrorObservable(err);
        },
        complete: () =>{
          this.mensaje.closeLoading();
          this.onListar();
        }
      });
    });
  }
}
