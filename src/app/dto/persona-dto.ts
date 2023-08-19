import { ComentarioDTO } from "./comentario-dto";
import { PublicacionDTO } from "./publicacion-dto";

export interface PersonaDTO {
    nombreCompleto:string;
    nombreUsuario:string;
    imgUsuario:string;
    publicaciones:PublicacionDTO[];
    comentarios:ComentarioDTO[];
}
