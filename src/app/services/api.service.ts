import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado.model';
import { Departamento } from '../models/departamento.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  
  private apiUrl = 'http://localhost:4000/api'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  // Métodos CRUD para Empleados
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/empleados`);
  }
  
  getEmpleadosByDepartamento(codigo_departamento: number): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/empleados/departamento/${codigo_departamento}`);
  }

  createEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.apiUrl}/empleados`, empleado);
  }

  updateEmpleado(codigo: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/empleados/${codigo}`, empleado);
  }

  deleteEmpleado(codigo: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/empleados/${codigo}`);
  }

  // Métodos CRUD para Departamentos
  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}/departamentos`);
  }

  createDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(`${this.apiUrl}/departamentos`, departamento);
  }

  updateDepartamento(codigo: number, departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/departamentos/${codigo}`, departamento);
  }

  deleteDepartamento(codigo: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/departamentos/${codigo}`);
  }}