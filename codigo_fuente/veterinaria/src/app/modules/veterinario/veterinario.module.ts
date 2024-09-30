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
import { SideMenuVeterinarioComponent } from '../../components/side-menu-veterinario/side-menu-veterinario.component';
import { VeterinarioRoutingModule } from './veterinario-routing.module';
import { VeterinarioComponent } from './veterinario.component';
import { CitashoyComponent } from './pages/citashoy/citashoy.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AtenderComponent } from './pages/atender/atender.component';

@NgModule({
  declarations: [ SideMenuVeterinarioComponent, VeterinarioComponent, CitashoyComponent, AtenderComponent],
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
    MatDatepickerModule,

    VeterinarioRoutingModule,
  ],
})
export class VeterinarioModule {}
