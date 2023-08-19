import { ComentarioDTO } from "./comentario-dto";

export interface PublicacionDTO {
    id:number;
    fotoAutor:string;
    autor:string;
    fecha:Date;
    titulo:string;
    contenido:string;
    tema:string;
}
