import { Imagen } from "./imagen";

export class Comida {
    public id:number;
    public nombreComida:string;
    public calorias:number;
    public imagen:Imagen;

    constructor(id:number, nombreComida:string, calorias:number, imagen:Imagen){
        this.id = id;
        this.nombreComida = nombreComida;
        this.calorias = calorias;
        this.imagen = imagen;
    }
}
