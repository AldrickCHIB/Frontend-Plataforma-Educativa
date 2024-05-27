import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { AuthService } from "../services/auth.service";

export const authGuard: CanMatchFn = (route, state) => {
  // guarda que valda si el usuario esta logueado-sirve para acceder a las paginas principales
  const authService = inject(AuthService);
  return authService._isLoggedIn;
};
