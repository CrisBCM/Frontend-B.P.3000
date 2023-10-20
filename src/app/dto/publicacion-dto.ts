export interface PublicacionDTO {
    id:number;
    fotoAutor:string;
    autor:string;
    fecha:Date;
    titulo:string;
    contenido:string;
    categoria:string;
    listaMeGusta:string[];
    listaNoMeGusta:string[];
    puntuacion:number;
}
