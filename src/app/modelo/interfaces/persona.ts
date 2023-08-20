import { Estomago } from "./estomago";
import { Publicacion } from "./publicacion";
import { DatosPrincipales } from "./datos-principales";
import { Imagen } from "./imagen";

export interface Persona extends DatosPrincipales{
    id:number;
    cantidadActividad:number;
    estomago:Estomago;
    pesoCorporal:number;
    publicaciones:Publicacion[];
    imgAvatar:Imagen;
}
