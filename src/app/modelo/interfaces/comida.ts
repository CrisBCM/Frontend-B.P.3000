import { Imagen } from "./imagen";

export interface Comida {
    id:number;
    nombreComida:string;
    calorias:number;
    imagen:Imagen
}
