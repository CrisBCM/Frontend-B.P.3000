import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/modelo/clases/persona';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { ForoService } from 'src/app/service/foro.service';

@Component({
  selector: 'app-foro-main',
  templateUrl: './foro-main.component.html',
  styleUrls: ['./foro-main.component.css']
})
export class ForoMainComponent {
  
  publicaciones$:Observable<Publicacion[]>;

  constructor(private foroService:ForoService){
    this.publicaciones$ = foroService.obtenerPosts();
  }

}
