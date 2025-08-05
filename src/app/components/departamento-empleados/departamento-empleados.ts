import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Departamento } from '../../models/departamento.model';
import { Empleado } from '../../models/empleado.model';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-departamento-empleados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departamento-empleados.html'
})
export class DepartamentoEmpleadosComponent implements OnInit {
  departamentos: Departamento[] = [];
  empleados: Empleado[] = [];
  selectedDepartamentoCodigo: number | null = null;
  selectedDepartamentoNombre: string = '';
  private subscription!: Subscription;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService 
  ) {}

  ngOnInit(): void {
    this.getDepartamentos();

    this.subscription = this.notificationService.empleadoCambio$.subscribe(() => {
      if (this.selectedDepartamentoCodigo !== null) {
      
        this.getEmpleadosByDept({ code: this.selectedDepartamentoCodigo, name: this.selectedDepartamentoNombre });
      }
    });
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getDepartamentos() {
    this.apiService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data;
        if (data.length > 0) {
          this.getEmpleadosByDept(data[0]);
        }
      },
      error: (e) => console.error('Error al obtener departamentos', e)
    });
  }

  getEmpleadosByDept(departamento: Departamento) {
    this.selectedDepartamentoCodigo = departamento.code;
    this.selectedDepartamentoNombre = departamento.name;
    this.apiService.getEmpleadosByDepartamento(departamento.code).subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (e) => console.error('Error al obtener empleados', e)
    });
  }
}