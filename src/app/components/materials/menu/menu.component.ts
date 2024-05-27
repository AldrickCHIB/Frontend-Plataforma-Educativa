import { Component,Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

/**
 * @title Menu with icons
 */
@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule,RouterModule],
})
export class MenuComponent { 

  constructor( private _renderer2: Renderer2) {
    
  }

  


}