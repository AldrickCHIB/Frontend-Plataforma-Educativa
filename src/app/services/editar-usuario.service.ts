import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditarUsuarioService {

  // subscripcion a los datos del usuario actual,se utiliza de manera general 
  private usuarioSource = new BehaviorSubject(null);
  usuarioActual = this.usuarioSource.asObservable();

  constructor() { }

  actualizarUsuario(usuario:any) {
    this.usuarioSource.next(usuario);
  }
  
}
