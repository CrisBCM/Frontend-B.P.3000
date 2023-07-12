import { Comida } from "./comida";

export class Estomago {
    public id:number;
    public listaComida:Array<Comida>;
    public totalConsumido:number;
    
    constructor(id:number, listaComida:Array<Comida>, totalConsumido:number){
        this.id = id;
        this.listaComida = listaComida;
        this.totalConsumido = totalConsumido;
    }

}
