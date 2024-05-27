import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import {ThemePalette} from '@angular/material/core';




@Component({
  selector: 'app-config-users',
  templateUrl: './config-users.component.html',
  styleUrl: './config-users.component.css',
  standalone: true,
  imports: [MatTabsModule, MatIconModule, MatToolbarModule, RouterModule, MatDividerModule,MatButtonModule]
})
export class ConfigUsersComponent {

   selectedLink:any;

   changeColor(event: any) {
    if(this.selectedLink) {
      this.selectedLink.style.color = "black"; // reset color of previous selected link
    }
    event.target.style.color = "red"; // change color of currently selected link
    this.selectedLink = event.target; // update the selected link
  }

}
