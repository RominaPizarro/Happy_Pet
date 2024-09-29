import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioListComponent } from './veterinario-list.component';

describe('VeterinarioListComponent', () => {
  let component: VeterinarioListComponent;
  let fixture: ComponentFixture<VeterinarioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeterinarioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
