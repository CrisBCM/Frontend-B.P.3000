import { PublicacionDTO } from "src/app/dto/publicacion-dto";
import { Comentario } from "./comentario";

export interface Publicacion extends PublicacionDTO{
    comentarios:Comentario[]
}
