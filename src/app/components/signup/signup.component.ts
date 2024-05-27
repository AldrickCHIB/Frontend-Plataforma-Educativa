import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import Swal from 'sweetalert2';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from "@angular/router";



import { EditarUsuarioService } from '../../services/editar-usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',



})


export class SignupComponent implements OnInit {

  public formSubmitted = false;
  status: string | null = null;
  tipoUsuario: string | null = null;
  grado: string | null = null;
  validado: string | null = null;


  //requerimentos del formulario
  public registerForm = this.fb.group({

    status: ['', Validators.required],
    tipoUsuario: ['', Validators.required],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    secondlastname: ['', Validators.required],
    grado: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
    validado: ['', Validators.required]
  }, {
    validators: this.passwordsIguales('password', 'password_confirmation')
  });

  activo: any;
  public error: any = [];
  usuario: any;

  constructor(private backendService: BackendService,
    private fb: FormBuilder,
    private router: Router,
    private editarUsuario: EditarUsuarioService,
    private changeDetector: ChangeDetectorRef) {

    this.editarUsuario.usuarioActual.subscribe((usuario: any) => {
      this.usuario = usuario;
      // console.log( this.usuario);


      if (usuario) {
        this.registerForm.patchValue({
          status: usuario.status,
          tipoUsuario: usuario.tipoUsuario,
          name: usuario.name,
          lastname: usuario.lastname,
          secondlastname: usuario.secondlastname,
          grado: usuario.grado,
          email: usuario.email,
          password: usuario.password,
          password_confirmation: usuario.password_confirmation,
          validado: usuario.validado


        });
      } else {
        // Aquí puedes manejar el caso en que usuario.name sea null o undefined
        // Por ejemplo, podrías asignar una cadena vacía al campo name
        this.registerForm.patchValue({
          status: '',
          tipoUsuario: '',
          name: '',
          lastname: '',
          secondlastname: '',
          grado: '',
          email: '',
          password: '',
          password_confirmation: '',
          validado: ''
        });

      }


    });
  }

  ngOnInit(): void {


  }
  // ---------------------------limpiar formulario------------------------------
  // navega a la misma pagina para refrescarla y eliminar los datos del formulario
  limpiarFormulario() {
    this.router.navigateByUrl('/profile/configuracion/usuarios/adminUsers').then(() => {
      this.registerForm.reset();

      location.reload();
    });
  }

  //-----------------------validacion si el campo esta vacio-----------------------------
  campoVacio(campo: string): boolean {

    if ((this.registerForm.get(campo)?.value === '') && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }


  //-----------------------funcion para creacion del usuario------------------------------
  crearUsuario() {
    this.formSubmitted = true;
    // console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }

    // ------------------crea el usuario y envia una alarma de usuario registrado correctamente------------------------
    this.backendService.crearUsuario(this.registerForm.value).subscribe(
      resp => {
        //console.log('usuario creado');
        //console.log(resp);

        //---------------Mensaje de usuario creado exitosamente
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario creado exitosamente",
          showConfirmButton: false,
          timer: 1500
        });
        //


        //refresca la pagina para actualizar usuarios en tabla de usuarios-es temporal ya que se cambiara por una subscripcion a los usuarios
        location.reload();

      }, (err) => {
        //envia error si el usuario ya fue registrado
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  //envia error si el campo del formulario no se lleno correctamente al enviar el formulario
  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  //validacion de error de contraseñas iguales
  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password_confirmation')?.value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  // mensaje de error
  handleError(error: any) {
    this.error = error.error.errors;
    console.log(this.registerForm.value);
  }

  //requerimento de campos de contraseñas en formularios
  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ((pass1Control?.value === pass2Control?.value) && (pass1Control?.value && pass2Control?.value !== '')) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }
    }
  }

  refreshPage() {
    this.router.navigateByUrl('usuarios/adminUsers');
  }
  // -------------------cancelar edicion de un UsuariosComponent,elimina los datos del formulario y regresa a adminUsers-----------------
  cancelarEdicion() {
    this.router.navigateByUrl('/profile/configuracion/usuarios/adminUsers');
    this.limpiarFormulario();



  }

  // --------------funcion para editar el usuario ya teniendo el fomulario lleno -----------------------------
  editUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // A ID del usuario que quieres editar
    const userId = this.usuario.id;
    console.log(userId);

    this.backendService.editUser(userId, this.registerForm.value,).subscribe(
      resp => {

        console.log('usuario actualizado');
        console.log(resp);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario actualizado exitosamente",
          showConfirmButton: false,
          timer: 1500
        });


        // Refresca la página para actualizar usuarios en tabla de usuarios
        this.limpiarFormulario();

      }, (err) => {
        // Muestra un mensaje de error si la actualización falla
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
  // ------------------------------botones-------------------------------------

  buscar() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {

    }
  }

  reportesExcel() {
    Swal.fire({
      title: "¡En desarrollo!",
      text: "Proximamente disponible",
      imageUrl: "https://unsplash.it/400/200",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });
  }

  cargaMasiva() {
    Swal.fire({
      title: "¡En desarrollo!",
      text: "Proximamente disponible",
      imageUrl: "https://unsplash.it/400/200",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });
  }


};
