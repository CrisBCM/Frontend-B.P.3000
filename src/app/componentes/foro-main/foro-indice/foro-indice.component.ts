import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import es from 'date-fns/locale/es';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/modelo/interfaces/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';

@Component({
  selector: 'app-foro-indice',
  templateUrl: './foro-indice.component.html',
  styleUrls: ['./foro-indice.component.css']
})
export class ForoIndiceComponent {

  categorias$:Observable<Categoria[]>;

  constructor(private categoriaService:CategoriaService, private perfilUsuarioService:PerfilUsuarioService, private router:Router){
    this.categorias$ = categoriaService.categoriasObservable;
  }
  redirigirPerfilUsuario(nombreUsuario:string){
    this.perfilUsuarioService.redirigirAPerfilUsuario(nombreUsuario);
  }
  redirigirACategoria(nombreCategoria:string){
    this.categoriaService.setPublicaciones = [];
    this.router.navigate(['/bp-foro/categoria/' + nombreCategoria]);
  }
}
