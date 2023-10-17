import { CategoriaDTO } from "src/app/dto/categoria-dto";
import { Publicacion } from "./publicacion";
import { PublicacionDTO } from "src/app/dto/publicacion-dto";
import { UltimaPublicacionDTO } from "src/app/dto/ultima-publicacion-dto";

export interface Categoria extends CategoriaDTO{
    id:number;
    ultimaPublicacion:UltimaPublicacionDTO;
    cantidadPublicaciones:number;
    habilitado:boolean;
}
