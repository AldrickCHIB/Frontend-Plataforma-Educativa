import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BackendService } from "../services/backend.service";
import { jwtDecode } from "jwt-decode";




@Injectable({
    providedIn: 'root'
})
export class AuthService {

  // url del backend en local
    private apiURL = "http://127.0.0.1:8000/api/";
    private user?: User;
    private isLoggedIn: boolean = false;


    constructor(private http: HttpClient, private router: Router) { }

    get currentUser(): User | undefined {
        if (!this.user) return undefined
        return structuredClone(this.user)
    }

    getToken(): string | null {
        return localStorage.getItem("token")
    }

    remove() {
        return localStorage.removeItem("token");
    }


    // funcion de logueo que envia peticion al backend y se subsribe para obtener la respuesta
    login(email: string, password: string): Observable<User> {

        //en una aplicación real se haría:
        //return this.http.post('login', {email,password})
        return this.http.get<User>(`${this.apiURL}login`)

            .pipe(
                tap(user => this.user = user),

                tap(user => localStorage.setItem('token', user.id.toString())),
            )
    }

    usuarioLogueado() {


        this.router.navigate(['/profile']);

    }

    usuarioDeslogueado() {

        this.isLoggedIn = false;
        this.remove();
        this.router.navigate(['/']);
    }

    get _isLoggedIn() {

        const token = localStorage.getItem('token');
        return token != null;

    }

     isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          if (decoded && decoded.exp && decoded.exp< Date.now() / 1000) {
            this.refreshToken();
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
// Funcion que refresca el token cuando su tiempo caduco,si no puede refrescarlo te saca y envia a la pagina login
  private refreshToken(): void {
    const refreshToken = localStorage.getItem('refreshToken');
    this.http.post(`${this.apiURL}refresh`, {token: refreshToken}).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
      },
      (err) => {
        console.log(err);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['/login']);
        // Redirige al usuario a la página de inicio de sesión
      }
    );
  }
}


   

