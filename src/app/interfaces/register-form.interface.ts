export interface RegisterForm {
    status:  string|null;
    tipoUsuario: string | null;
    name: string;
    lastname: string;
    secondlastname: string;
    grado:string|null;
    email: string;
    password: string;
    
    password_confirmation: string;
    validado:string|null;
}