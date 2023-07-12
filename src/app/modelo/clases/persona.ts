import { Estomago } from "./estomago";

export class Persona {
    public nombreUsuario:string;
    public cantidadActividad:number;
    public estomago:Estomago;
    public pesoCorporal:number;
    public urlAvatar:string;

    constructor(nombreUsuario:string, cantidadActividad:number, estomago:Estomago, pesoCorporal:number, urlAvatar:string){
        this.nombreUsuario = nombreUsuario;
        this.cantidadActividad = cantidadActividad;
        this.estomago = estomago;
        this.pesoCorporal = pesoCorporal;
        this.urlAvatar = urlAvatar;
    }

}
