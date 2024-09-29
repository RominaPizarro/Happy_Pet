import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioFormComponent } from './veterinario-form.component';

describe('VeterinarioFormComponent', () => {
  let component: VeterinarioFormComponent;
  let fixture: ComponentFixture<VeterinarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeterinarioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
