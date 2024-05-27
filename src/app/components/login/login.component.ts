import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { error } from 'console';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {}

  public formSubmitted = false;
  public isLoggedIn: boolean = this.authService._isLoggedIn;

  //validaciones del formulario
  public loginForm: FormGroup = this.fb.group({

    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]

  });

  constructor(private router: Router, private usuarioService: BackendService, private fb: FormBuilder, private authService: AuthService) { }

  rutaProfile() {
    if (this.isLoggedIn = true) {
        this.refreshPage();
    }
  }

  //funcion de logueo de usuario
  login() {
        this.formSubmitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.usuarioService.login(this.loginForm.value).subscribe(resp => {

        //si logueo = true, se indica en consola usuario logueado y se envia a la ventana del usuario
        console.log('usuario logueado');
        console.log(this.loginForm.value);


        //boton rememember me -guarda el email del usuario en un token para proximo logueo
        if (this.loginForm.get('remember')!.value) {
            localStorage.setItem('email', this.loginForm.get('email')!.value);
        } else {
            localStorage.removeItem('email');
        }

        this.refreshPage();

        //si el logueo no es exitoso envia ventana de error
      }, (err) => {
        Swal.fire('Error', err.error.error, 'error');
      }
      );
    }



  //envia error si el campo del formulario no se lleno correctamente al enviar el formulario



  refreshPage() {
    if ((this.isLoggedIn = true)) {
      window.location.href = (`http://localhost:4200/profile`);
      return;
    }
  }

  campoVacio(campo: string): boolean {
    if ((this.loginForm.get(campo)?.value === '') && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }


  in() {
    this.refreshPage();
    this.authService.usuarioLogueado;
    this.isLoggedIn = true;
    this.router.navigate(['/profile']);
    console.log(this.isLoggedIn);
  }
}