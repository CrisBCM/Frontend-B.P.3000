import { Publicacion } from "../interfaces/publicacion";
import { Estomago } from "./estomago";
import { Imagen } from "./imagen";

export class Persona {
    public nombreCompleto:string;
    public nombreUsuario:string;
    public cantidadActividad:number;
    public estomago:Estomago;
    public pesoCorporal:number;
    public imgAvatar:Imagen;
    public publicaciones:Publicacion[];
    public totalConsumido:number;

    constructor(nombreCompleto:string, nombreUsuario:string, cantidadActividad:number, estomago:Estomago, pesoCorporal:number, imgAvatar:Imagen, publicaciones:Publicacion[]){
        this.nombreCompleto = nombreCompleto;
        this.nombreUsuario = nombreUsuario;
        this.cantidadActividad = cantidadActividad;
        this.estomago = estomago;
        this.pesoCorporal = pesoCorporal;
        this.imgAvatar = imgAvatar;
        this.publicaciones = publicaciones;
        this.totalConsumido = 0;
    }

    public setTotalConsumido(totalConsumido:number){
        this.totalConsumido = totalConsumido;
    }

    public getTotalConsumido(){
        return this.totalConsumido;
    }

}
