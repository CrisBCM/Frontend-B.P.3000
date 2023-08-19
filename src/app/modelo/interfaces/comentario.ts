import { ComentarioDTO } from "src/app/dto/comentario-dto";
import { Respuesta } from "./respuesta";

export interface Comentario extends ComentarioDTO{
    id:number;
    respuestas:Respuesta[];
}
