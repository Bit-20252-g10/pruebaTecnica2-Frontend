import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoEmpleados } from './departamento-empleados';

describe('DepartamentoEmpleados', () => {
  let component: DepartamentoEmpleados;
  let fixture: ComponentFixture<DepartamentoEmpleados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentoEmpleados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentoEmpleados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
