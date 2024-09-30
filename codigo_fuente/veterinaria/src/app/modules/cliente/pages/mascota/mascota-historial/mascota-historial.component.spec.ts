import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaHistorialComponent } from './mascota-historial.component';

describe('MascotaHistorialComponent', () => {
  let component: MascotaHistorialComponent;
  let fixture: ComponentFixture<MascotaHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MascotaHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotaHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
