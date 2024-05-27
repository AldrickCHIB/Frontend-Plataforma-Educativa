import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import Swal from 'sweetalert2';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BackendService } from "../../../services/backend.service";
import { AuthService } from "../../../services/auth.service";

import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from "@angular/router";

import { EditarUsuarioService } from '../../../services/editar-usuario.service';

import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';




export interface Usuarios {
  id: number;
  status: string;
  name: string;
  tipoUsuario: string;
  grado: string;

}
@Component({
  selector: 'app-tabla-usuarios',
  styleUrl: './tabla-usuarios.component.css',
  templateUrl: './tabla-usuarios.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatToolbarModule, MatButtonModule,CommonModule],
})
export class TablaUsuariosComponent implements OnInit{

  dataSource!: MatTableDataSource<Usuarios>;
  displayedColumns: string[] = ['id', 'name', 'tipoUsuario', 'grado', 'acciones'];
  users: any;
  usuario:any;
  esAdministrador: boolean | undefined;

  constructor(private backendService: BackendService, 
              private authService: AuthService,
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private editarUsuario: EditarUsuarioService) {

                this.editarUsuario.usuarioActual.subscribe((usuario: any) => {
                  this.usuario = usuario;
                  

                 
               });

              

              
              
              }


  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {

  }

  ngOnInit() {
    
    this.obtenerUsuarios();
    this.backendService.datosUsuario(this.authService.getToken()).subscribe(
      (isAdmin: any) => {
        this.esAdministrador = isAdmin.tipoUsuario === 'Administrador';
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  editar(id: any) {
    this.router.navigate(['profile/configuracion/usuarios/adminUsers', id]);
    let id_user:number=id;
    console.log(id_user);

    // Buscar el usuario en la lista de usuarios
    const user = this.users.find((user: { id: number; }) => user.id === id_user);
    //console.log(user);

    let usuario = user;
    this.editarUsuario.actualizarUsuario(usuario);
}

  eliminarUsuario(id:any) {
    let id_user:number=id;
    const user = this.users.find((user: { id: number; }) => user.id === id_user);
    let usuario = user;
    this.editarUsuario.actualizarUsuario(usuario);

    console.log(id_user);
    Swal.fire({
      title: "¡Estas eliminando un usuario!",
      text: "¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {


        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario Eliminado",
          text:"Los cambios han sido guardados.",
          showConfirmButton: false,
          timer: 1500
        });
       
        
        const userId = this.usuario.id;
        console.log(this.usuario.name);
        this.backendService.deleteUser(userId).subscribe(
          response => {
            console.log('Response:', response);
            this.router.navigateByUrl('/profile/configuracion/usuarios/adminUsers').then(() => {
            location.reload();
            });
          },
          error => {
            console.log('Error:', error);

          }
        );
       
      }
    });
  
}

  obtenerUsuarios(){
    this.backendService.getAllUsers(this.authService.getToken()).subscribe(
      users => {
        this.users = users;

        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        //console.log(this.users);
        const NAMES = this.users.map((user: { name: any; }) => user.name);
        //console.log(NAMES);
      },
      error => {
        console.error(error);
      }
    );

  }

  limpiarFormulario(){
    this.router.navigateByUrl('/profile/configuracion/usuarios/adminUsers').then(() => {
      
      
      location.reload();
    });
   }

  //  ---------------------------busqueda de  usuarios -----------------------------------------
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
  



