import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsuarioListComponent } from './pages/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './pages/usuario/usuario-form/usuario-form.component';
import { VeterinarioFormComponent } from './pages/veterinario/veterinario-form/veterinario-form.component';
import { VeterinarioListComponent } from './pages/veterinario/veterinario-list/veterinario-list.component';
import { HorarioListComponent } from './pages/horario/horario-list/horario-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'usuario/list', component: UsuarioListComponent },
      { path: 'usuario/add', component: UsuarioFormComponent },
      { path: 'usuario/edit/:id', component: UsuarioFormComponent },

      { path: 'veterinario/list', component: VeterinarioListComponent },
      { path: 'veterinario/add', component: VeterinarioFormComponent },
      { path: 'veterinario/edit/:id', component: VeterinarioFormComponent },

      { path: 'veterinario/horario/:id', component: HorarioListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
