import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SideMenuAdminComponent } from '../../components/side-menu-admin/side-menu-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuarioListComponent } from './pages/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './pages/usuario/usuario-form/usuario-form.component';
import {MatTableModule} from '@angular/material/table';
import { VeterinarioListComponent } from './pages/veterinario/veterinario-list/veterinario-list.component';
import { VeterinarioFormComponent } from './pages/veterinario/veterinario-form/veterinario-form.component';
import { HorarioListComponent } from './pages/horario/horario-list/horario-list.component';

@NgModule({
  declarations: [SideMenuAdminComponent, AdminComponent, UsuarioListComponent, UsuarioFormComponent, VeterinarioListComponent, VeterinarioFormComponent, HorarioListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonToggleModule,

    AdminRoutingModule,
  ],
})
export class AdminModule {}
