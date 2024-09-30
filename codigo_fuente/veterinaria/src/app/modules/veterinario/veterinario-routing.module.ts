import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeterinarioComponent } from './veterinario.component';
import { CitashoyComponent } from './pages/citashoy/citashoy.component';
import { AtenderComponent } from './pages/atender/atender.component';

const routes: Routes = [
  {
    path: '',
    component: VeterinarioComponent,
    children: [
      { path: 'cita/list', component: CitashoyComponent },
      { path: 'cita/atender/:id', component: AtenderComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeterinarioRoutingModule {}
