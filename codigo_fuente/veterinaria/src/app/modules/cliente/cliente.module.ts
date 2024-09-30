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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClienteRoutingModule } from './cliente-routing.module';
import { SideMenuClienteComponent } from '../../components/side-menu-cliente/side-menu-cliente.component';
import { ClienteComponent } from './cliente.component';
import { MascotaListComponent } from './pages/mascota/mascota-list/mascota-list.component';
import { MascotaFormComponent } from './pages/mascota/mascota-form/mascota-form.component';

@NgModule({
  declarations: [ SideMenuClienteComponent, ClienteComponent, MascotaListComponent, MascotaFormComponent],
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

    ClienteRoutingModule,
  ],
})
export class ClienteModule {}
