import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuClienteComponent } from './side-menu-cliente.component';

describe('SideMenuClienteComponent', () => {
  let component: SideMenuClienteComponent;
  let fixture: ComponentFixture<SideMenuClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
