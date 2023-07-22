import { Estomago } from "./estomago";
import { Imagen } from "./imagen";

export class Persona {
    public nombreCompleto:string;
    public nombreUsuario:string;
    public cantidadActividad:number;
    public estomago:Estomago;
    public pesoCorporal:number;
    public imgAvatar:Imagen;

    constructor(nombreCompleto:string, nombreUsuario:string, cantidadActividad:number, estomago:Estomago, pesoCorporal:number, imgAvatar:Imagen){
        this.nombreCompleto = nombreCompleto;
        this.nombreUsuario = nombreUsuario;
        this.cantidadActividad = cantidadActividad;
        this.estomago = estomago;
        this.pesoCorporal = pesoCorporal;
        this.imgAvatar = imgAvatar;
    }

}
