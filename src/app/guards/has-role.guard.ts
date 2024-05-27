import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, Route } from '@angular/router';

import { BackendService } from '../services/backend.service';




export const hasRoleGuard: CanMatchFn =  (route, state) => {
/* guarda que valida el rol en este caso administrador para realizar tareas especificas */
  const backendService = inject(BackendService);
  return backendService.hasRole();


  };
  
