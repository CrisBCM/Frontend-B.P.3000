export class RegistroPersona {
    private nombreCompleto:string;
    private email:string;
    private password:string;
    private nombreUsuario:string;
    private pesoCorporal:number;
    private cantidadActividad:number;

    constructor(nombreCompleto:string, email:string, password:string, nombreUsuario:string, pesoCorporal:number, cantidadActividad:number){
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.password = password;
        this.nombreUsuario = nombreUsuario;
        this.pesoCorporal = pesoCorporal;
        this.cantidadActividad = cantidadActividad;
    }
}
