import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuVeterinarioComponent } from './side-menu-veterinario.component';

describe('SideMenuVeterinarioComponent', () => {
  let component: SideMenuVeterinarioComponent;
  let fixture: ComponentFixture<SideMenuVeterinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuVeterinarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
