import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/modelo/clases/persona';
import { IPublicacion } from 'src/app/modelo/interfaces/IPublicacion';
import { ForoService } from 'src/app/service/foro.service';

@Component({
  selector: 'app-foro-main',
  templateUrl: './foro-main.component.html',
  styleUrls: ['./foro-main.component.css']
})
export class ForoMainComponent {
  
  publicaciones$:Observable<IPublicacion[] | null>;

  constructor(private foroService:ForoService, private router:Router){
    this.publicaciones$ = foroService.behaviorSubjectPublicaciones;
  }
  
  redirigirAPublicacion(idPublicacion:number){
    this.router.navigate(["/publicacion", idPublicacion]);
  }

}
