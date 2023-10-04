import { CategoriaDTO } from "src/app/dto/categoria-dto";
import { Publicacion } from "./publicacion";
import { PublicacionDTO } from "src/app/dto/publicacion-dto";

export interface Categoria extends CategoriaDTO{
    id:number;
    publicaciones:Publicacion[];
}
