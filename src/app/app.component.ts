import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'frontend';

  mostrarComponente = false;
  rutasParaOcultar = ['/login', '/home'];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      // Actualiza 'mostrarComponente' basado en la ruta actual
      this.mostrarComponente = !this.rutasParaOcultar.includes(this.router.url);
    });
  }
}