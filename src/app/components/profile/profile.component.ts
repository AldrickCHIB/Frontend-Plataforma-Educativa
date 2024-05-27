import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private backendService: BackendService, private authService: AuthService) { }

  ngOnInit(): void {

   // console.log(this.backendService.datosUsuario(this.authService.getToken));
  }


}
