export class PerfilPersona {
    public nombreCompleto:string;
    public peso:number;
    public cantidadActividad:number;
    public consumoDelDia:number;
    public urlAvatar:string;

    constructor(nombreCompleto:string, peso:number, cantidadActividad:number, consumoDelDia:number, urlAvatar:string){
        this.nombreCompleto = nombreCompleto;
        this.peso = peso;
        this.cantidadActividad = cantidadActividad;
        this.consumoDelDia = consumoDelDia;
        this.urlAvatar = urlAvatar;
    }
}
