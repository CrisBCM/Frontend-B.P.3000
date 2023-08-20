import { DatosPrincipales } from "../modelo/interfaces/datos-principales";
import { ComentarioDTO } from "./comentario-dto";
import { PublicacionDTO } from "./publicacion-dto";

export interface PersonaDTO extends DatosPrincipales{
    imgUsuario:string;
    publicaciones:PublicacionDTO[];
    comentarios:ComentarioDTO[];
}
