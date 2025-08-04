import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Departamento } from '../../models/departamento.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-departamento-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './departamento-form.component.html'
})
export class DepartamentoFormComponent implements OnInit {
  departamentoForm: FormGroup;
  departamentos: Departamento[] = [];
  editingDepartamento: Departamento | null = null;

  constructor(private apiService: ApiService) {
    this.departamentoForm = new FormGroup({
      codigo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getDepartamentos();
  }

  getDepartamentos() {
    this.apiService.getDepartamentos().subscribe(data => this.departamentos = data);
  }

  onSubmit() {
    if (this.departamentoForm.valid) {
      const departamento: Departamento = this.departamentoForm.value;
      if (this.editingDepartamento) {
        this.apiService.updateDepartamento(this.editingDepartamento.codigo, departamento).subscribe(() => {
          this.getDepartamentos();
          this.resetForm();
        });
      } else {
        this.apiService.createDepartamento(departamento).subscribe(() => {
          this.getDepartamentos();
          this.resetForm();
        });
      }
    }
  }

  editDepartamento(departamento: Departamento) {
    this.editingDepartamento = departamento;
    this.departamentoForm.setValue({
      codigo: departamento.codigo,
      nombre: departamento.nombre
    });
  }

  deleteDepartamento(codigo: number) {
    this.apiService.deleteDepartamento(codigo).subscribe(() => this.getDepartamentos());
  }

  resetForm() {
    this.departamentoForm.reset();
    this.editingDepartamento = null;
  }
}
