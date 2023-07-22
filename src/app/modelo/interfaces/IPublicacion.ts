export interface IPublicacion {
    id:number;
    titulo:string;
    contenido:string;
    tema:string;
    fecha:Date;
    autor:string;
    comentarios:IComentario[];
}

export interface IComentario{
    id:number;
    autor:string;
    contenido:string;
    fecha:Date;
    likes:number;
    dislikes:number;
}