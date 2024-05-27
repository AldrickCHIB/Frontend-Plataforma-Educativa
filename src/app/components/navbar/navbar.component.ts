import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import isLoggedIn from '../../utils/isLoggedIn.';
import { AuthService } from '../../services/auth.service';
import { __values } from 'tslib';
import Swal from "sweetalert2";
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone:true,
  imports:[MatIconModule,CommonModule,RouterModule],
  
})

export class NavbarComponent implements OnInit {
  // ---------funcion para validar el status logueado del usuario-----------------
  public isLoggedIn: boolean = this.authService._isLoggedIn;

  data: any;
  

  constructor(private backendService: BackendService, private authService: AuthService) { }


  ngOnInit(): void {

    // ------------------------adquiere los datos del usuario actual comunicandose con el backend por esta peticion--------------------------------
   // console.log(this.authService.getToken());
    this.backendService.datosUsuario(this.authService.getToken()).subscribe(
        data => {
          this.data = data;
         // console.log(data);
         // console.log(data.tipoUsuario);
        },
        error => {
          console.error(error);
        }
      );

      this.authService.isAuthenticated();
  }

  ngOnDestroy(){}

  //  ------------------------------Deslogueo de usuario-elimina el token para cerrar sesion--------------------
  logout() {
    this.authService.usuarioDeslogueado();
    //this.authService._isLoggedIn;
    this.isLoggedIn = this.authService._isLoggedIn;

    //mensaje de deslogueo exitoso
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Sesion cerrada",
      showConfirmButton: false,
      timer: 1500
    });

  }
}

