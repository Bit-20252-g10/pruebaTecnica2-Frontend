import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Departamento } from '../../models/departamento.model';
import { Empleado } from '../../models/empleado.model';
import { ApiService } from '../../services/api.service';

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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getDepartamentos();
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
    this.selectedDepartamentoCodigo = departamento.codigo;
    this.selectedDepartamentoNombre = departamento.nombre;
    this.apiService.getEmpleadosByDepartamento(departamento.codigo).subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (e) => console.error('Error al obtener empleados', e)
    });
  }
}


