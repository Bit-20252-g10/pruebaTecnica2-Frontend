import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private empleadoCambioSource = new Subject<void>();


  empleadoCambio$ = this.empleadoCambioSource.asObservable();


  notificarCambioDeEmpleado() {
    this.empleadoCambioSource.next();
  }
}