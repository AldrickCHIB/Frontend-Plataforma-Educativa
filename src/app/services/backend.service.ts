import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { AuthService } from './auth.service';
import { Router } from "@angular/router";

import { tap, map, catchError } from "rxjs/operators";
import { Token } from '@angular/compiler';
import { authGuard } from '../guards/auth.guard';
import { Observable, of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiURL = "http://127.0.0.1:8000/api/";
  static hasRole: any;
  isAdmin:any;
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }


  //Crear usuario y  mandar datos a la base de datos
  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${this.apiURL}signup`, formData);

  }

  // funcion que edita el usuario dependiendo del Id que seleccionas,actualiza el fomrData
  editUser(id: string, formData: RegisterForm) {
    return this.http.post(`${this.apiURL}editUser/${id}`, formData);
  }

  // funcion que elimina el usuario,hace la peticion al backend y borra sus datos
  deleteUser(id: number) {
    return this.http.delete(`${this.apiURL}deleteUser/${id}`);
  }


  //Loguear usuario y guardar email con el boton 'remember' en localstorage
  login(formData: LoginForm) {
    return this.http.post(`${this.apiURL}login`, formData)

      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);





        })
      )
  }


  //-------Se realiza peticion al back para validar los datos del usuario 
  datosUsuario(token: any): Observable<any> {

    const headers= new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return  this.http.get<any>(`${this.apiURL}profile`, { headers });
  }



  //--------------------------------obtener datos de todos los usuarios registrados-peticion al back-----------------------------

  getAllUsers(token: any): Observable<any> {
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiURL}getAllUsers`, { headers });
  }

   //--------------------------------obtener datos de todos los usuarios registrados-----------------------------
  //realiza una funcion para validar si el usuario es Administrador
 
    hasRole() :Observable<any>{
    return this.datosUsuario(this.authService.getToken()).pipe(
        map(user => {
          //console.log(user.tipoUsuario);
          if (user.tipoUsuario === 'Administrador') {
            return true;
          } else {
            return false;
          }

        },
          catchError(error => {
            console.error(error);
            return of(null);
          }
          )));

  
  }




}



function resp(value: Object, index: number): unknown {
  throw new Error('Function not implemented.');
}

