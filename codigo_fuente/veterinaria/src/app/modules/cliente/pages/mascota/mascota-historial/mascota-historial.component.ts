import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { MensajesService } from '../../../../../core/services/mensajes.service';
import { MascotaService } from '../../../services/mascota.service';
import { HistorialService } from '../../../services/historial.service';

@Component({
  selector: 'app-mascota-historial',
  templateUrl: './mascota-historial.component.html',
  styleUrl: './mascota-historial.component.css'
})
export class MascotaHistorialComponent implements OnInit {

  data: any[] = [];

  mascota: any = {};

  constructor(
    private mensaje: MensajesService,
    private router: Router,
    private route: ActivatedRoute,

    private historialService: HistorialService,
    private mascotaService: MascotaService,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.mascota.id = params.get('id');
    });

    this.onLoad();
  }

  onLoad(): void{
    if(!this.mascota?.id){
      return;
    }

    this.mensaje.showLoading();
    this.mascotaService.find({id: this.mascota?.id}).subscribe({
      next: (res: any) => {
        this.mascota = res;
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

    if(!this.mascota?.id){
      return;
    }

    this.mensaje.showLoading();
    this.historialService.list(this.mascota?.id).subscribe({
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
