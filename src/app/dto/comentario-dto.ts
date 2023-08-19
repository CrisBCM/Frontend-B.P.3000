import { RespuestaDTO } from "./respuesta-dto";

export interface ComentarioDTO {
    autor:string;
    fotoAutor:string;
    contenido:string;
    fecha:Date;
    listaMeGusta:string[];
    listaNoMeGusta:string[];
    respuestas:RespuestaDTO[];
    nombrePublicacion:string;
    publicacionId:number;
}
