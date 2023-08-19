import { Comida } from "./comida";

export class Estomago {
    public id:number;
    public comidas:Array<Comida>;
    public totalConsumido:number;
    
    constructor(id:number, comidas:Array<Comida>, totalConsumido:number){
        this.id = id;
        this.comidas = comidas;
        this.totalConsumido = totalConsumido;
    }

}
