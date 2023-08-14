export class PersonaDto {
    nombreUsuario:string;
    estomagoId:number;
    
    constructor(nombreUsuario:string, estomagoId:number){
        this.nombreUsuario = nombreUsuario;
        this.estomagoId = estomagoId;
    }
}
