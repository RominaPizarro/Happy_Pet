import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitashoyComponent } from './citashoy.component';

describe('CitashoyComponent', () => {
  let component: CitashoyComponent;
  let fixture: ComponentFixture<CitashoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitashoyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitashoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
