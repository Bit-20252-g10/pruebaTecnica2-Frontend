import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Empleado } from '../../models/empleado.model';
import { Departamento } from '../../models/departamento.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './empleado-form.component.html'
})
export class EmpleadoFormComponent implements OnInit {
  empleadoForm: FormGroup;
  empleados: Empleado[] = [];
  departamentos: Departamento[] = [];
  editingEmpleado: Empleado | null = null;

  constructor(private apiService: ApiService) {
    this.empleadoForm = new FormGroup({
      codigo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido1: new FormControl('', Validators.required),
      apellido2: new FormControl(''),
      codigo_departamento: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getEmpleados();
    this.getDepartamentos();
  }

  getEmpleados() {
    this.apiService.getEmpleados().subscribe(data => this.empleados = data);
  }

  getDepartamentos() {
    this.apiService.getDepartamentos().subscribe(data => this.departamentos = data);
  }

  onSubmit() {
    if (this.empleadoForm.valid) {
      const empleado: Empleado = this.empleadoForm.value;
      if (this.editingEmpleado) {
        this.apiService.updateEmpleado(this.editingEmpleado.codigo, empleado).subscribe(() => {
          this.getEmpleados();
          this.resetForm();
        });
      } else {
        this.apiService.createEmpleado(empleado).subscribe(() => {
          this.getEmpleados();
          this.resetForm();
        });
      }
    }
  }

  editEmpleado(empleado: Empleado) {
    this.editingEmpleado = empleado;
    this.empleadoForm.setValue({
      codigo: empleado.codigo,
      nombre: empleado.nombre,
      apellido1: empleado.apellido1,
      apellido2: empleado.apellido2,
      codigo_departamento: empleado.codigo_departamento
    });
  }

  deleteEmpleado(codigo: number) {
    this.apiService.deleteEmpleado(codigo).subscribe(() => this.getEmpleados());
  }

  resetForm() {
    this.empleadoForm.reset();
    this.editingEmpleado = null;
  }
}
