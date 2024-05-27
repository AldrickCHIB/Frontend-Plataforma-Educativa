import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanActivateFn, CanMatchFn } from '@angular/router';

//ruta principal Home
//ruta login principal
import { LoginComponent } from './components/login/login.component';
//Rutas ya logueado
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';


//Rutas principal ->
import { InicioComponent } from './components/principal/inicio/inicio.component';

//Rutas configuracion->
import { UsuariosComponent } from './components/configuracion/usuarios/usuarios.component';
import { AdminUsersComponent } from "./components/configuracion/usuarios/admin-users/admin-users.component";
import { AlumnosPadresComponent } from "./components/configuracion/usuarios/alumnos-padres/alumnos-padres.component";

//Importacion del guardia de rutas
import { authGuard } from "./guards/auth.guard";
//Ruta si ninguna coincide con la busqueda
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { hasRoleGuard } from './guards/has-role.guard';
import { TwoFactorAuthComponent } from './components/two-factor-auth/two-factor-auth.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },

  // En desarrollo para la verificacion de dos pasos
   { path: 'twoFactorAuth', component: TwoFactorAuthComponent },

 //si se requiere generar usuarios despues de un refresh de la DB,descomentar o comentar este canmatch y generarlos desde esta url
  { path: 'signup',  /* canMatch: [authGuard], */  component: SignupComponent },

  //rutas Home-perfil
  { path: 'profile',  canMatch: [authGuard], component: ProfileComponent, children:[

    //rutas Principal y sus opciones
      { path: '', redirectTo: 'principal/inicio',pathMatch: 'full' }, 
      { path: 'principal/inicio', component: InicioComponent },

    //Rutas configuracion y sus opciones
      { path: 'configuracion/usuarios', component: UsuariosComponent ,children:[
        
          { path: '', redirectTo: 'adminUsers',pathMatch: 'full' }, 
           { path: 'adminUsers' , component: AdminUsersComponent },
           { path: 'adminUsers/:id',  component: AdminUsersComponent },
           //ejemplo de hasrole -si no es administrativo no abre la pagina
           { path: 'alumnos-padres',  canMatch: [hasRoleGuard] ,component: AlumnosPadresComponent },
              ]},

  ]},

    

// pagina a la que se envia si el url no existe o no tienes acceso
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },

  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
