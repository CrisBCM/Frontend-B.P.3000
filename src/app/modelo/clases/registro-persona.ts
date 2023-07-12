export class RegistroPersona {
    private email:string;
    private password:string;
    private nombreUsuario:string;
    private pesoCorporal:number;
    private cantidadActividad:number;

    constructor(email:string, password:string, nombreUsuario:string, pesoCorporal:number, cantidadActividad:number){
        this.email = email;
        this.password = password;
        this.nombreUsuario = nombreUsuario;
        this.pesoCorporal = pesoCorporal;
        this.cantidadActividad = cantidadActividad;
    }
}
