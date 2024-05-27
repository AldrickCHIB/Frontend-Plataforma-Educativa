import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './interceptors/AuthInterceptor';






import { NavbarLoginComponent } from './components/navbar-login/navbar-login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MenuComponent } from './components/materials/menu/menu.component';
import { InicioComponent } from './components/principal/inicio/inicio.component';


// angular materials
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsuariosComponent } from './components/configuracion/usuarios/usuarios.component';
import { ConfigUsersComponent } from './components/materials/config-users/config-users.component';
import { AdminUsersComponent } from './components/configuracion/usuarios/admin-users/admin-users.component';
import { AlumnosPadresComponent } from './components/configuracion/usuarios/alumnos-padres/alumnos-padres.component';
import { TablaUsuariosComponent } from './components/materials/tabla-usuarios/tabla-usuarios.component';
import { Footer2Component } from './components/footer2/footer2.component';
import { TwoFactorAuthComponent } from './components/two-factor-auth/two-factor-auth.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
   
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    FooterComponent,
    HomeComponent,
 





    NavbarLoginComponent,
    NotFoundComponent,
    InicioComponent,
    UsuariosComponent,
    AdminUsersComponent,
    AlumnosPadresComponent,
    Footer2Component,
    TwoFactorAuthComponent,
    
   
    
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MenuComponent,
    ConfigUsersComponent,
    TablaUsuariosComponent  ,
    NavbarComponent,
    RouterModule
    
    
    
   
   
  ]
})
export class AppModule { }
