import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartamentoEmpleadosComponent } from './departamento-empleados';

describe('DepartamentoEmpleadosComponent', () => {
  let component: DepartamentoEmpleadosComponent;
  let fixture: ComponentFixture<DepartamentoEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Se corrige el nombre de la clase en la importación.
      imports: [DepartamentoEmpleadosComponent]
    })
    .compileComponents();


    fixture = TestBed.createComponent(DepartamentoEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
