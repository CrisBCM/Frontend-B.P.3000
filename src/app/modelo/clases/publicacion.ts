export class Publicacion {
    public titulo:string;
    public contenido:string;
    public tema:string;
    public fecha:Date;

    constructor(titulo:string, contenido:string, tema:string, fecha:Date)
    {

        this.titulo = titulo;
        this.contenido = contenido;
        this.tema = tema;
        this.fecha = fecha; 
    }
}
