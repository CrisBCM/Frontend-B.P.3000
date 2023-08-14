export interface IPublicacion extends IPublicacionForm{
    id:number;
    fotoAutor:string;
    autor:string;
    comentarios:IComentario[];
    fecha:Date;
}

export interface IPublicacionForm{
    titulo:string;
    contenido:string;
    tema:string;
}

export interface IRespuesta{
    id:number;
    autor:string;
    fotoAutor:string;
    contenido:string;
    fecha:Date;
    listaMeGusta:string[];
    listaNoMeGusta:string[];
}

export interface IComentario{
    id:number;
    autor:string;
    fotoAutor:string;
    contenido:string;
    fecha:Date;
    listaMeGusta:string[];
    listaNoMeGusta:string[];
    respuestas:IRespuesta[];
}