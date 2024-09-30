import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { MascotaListComponent } from './pages/mascota/mascota-list/mascota-list.component';
import { MascotaFormComponent } from './pages/mascota/mascota-form/mascota-form.component';
import { MascotaHistorialComponent } from './pages/mascota/mascota-historial/mascota-historial.component';
import { CitaListComponent } from './pages/cita/cita-list/cita-list.component';
import { CitaFormComponent } from './pages/cita/cita-form/cita-form.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      { path: 'mascota/list', component: MascotaListComponent },
      { path: 'mascota/add', component: MascotaFormComponent },
      { path: 'mascota/edit/:id', component: MascotaFormComponent },
      { path: 'mascota/historial/:id', component: MascotaHistorialComponent },

      { path: 'cita/list', component: CitaListComponent },
      { path: 'cita/add', component: CitaFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
