import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';
import { Comentario } from 'src/app/modelo/interfaces/comentario';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { Respuesta } from 'src/app/modelo/interfaces/respuesta';
import { ForoService } from 'src/app/service/foro.service';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';
import { PublicacionService } from 'src/app/service/publicacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit, OnDestroy{
  idPublicacion!:number;
  nombreUsuario:string = "";
  publicacion!:Publicacion;
  publicaciones$!:Observable<Publicacion[] | null>;
  mostrar:boolean = true;
  responder:boolean = false;
  switchEditarPublicacion:boolean = false;
  onDestroy$:Subject<Boolean> = new Subject();
  tokenDecoded$!:Observable<any>;

  constructor(private tokenService:TokenService, private publicacionService:PublicacionService, activatedRoute:ActivatedRoute, private foroService:ForoService, private router:Router, private perfilUsuarioService:PerfilUsuarioService){
    
    activatedRoute.params.subscribe((params:Params) =>{
      this.idPublicacion = params["idPublicacion"];
    })
    this.tokenDecoded$ = tokenService.tokenDecoded$;

    this.tokenDecoded$.subscribe(tokendDecoded =>{
      this.nombreUsuario = tokendDecoded.nombreUsuario;
      console.log(this.nombreUsuario);
    })
  }
  ngOnInit(): void {
    
    this.publicaciones$ = this.foroService.behaviorSubjectPublicaciones;
    
    this.publicaciones$
    .pipe(takeUntil(this.onDestroy$))
    .pipe(map(publicaciones => publicaciones?.filter(publicacion => publicacion.id == this.idPublicacion)))
    .subscribe(arrayPublicacionFiltrada =>{

      if(arrayPublicacionFiltrada != null){

        this.publicacion = arrayPublicacionFiltrada[0];

        this.publicacionService.setPublicacion = this.publicacion;

        console.log(JSON.stringify("THIS.PUBLICACION " + JSON.stringify(this.publicacion)));

      }
    })
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
  publicacionMeGusta(){
    this.foroService.publicacionMeGusta(this.idPublicacion, this.nombreUsuario).subscribe(()=>{})
    this.foroService.setMeGustaPublicacion(this.idPublicacion, this.nombreUsuario);
  }
  publicacionNoMeGusta(){
    this.foroService.publicacionNoMeGusta(this.idPublicacion, this.nombreUsuario).subscribe(()=>{})
    this.foroService.setPublicacionNoMeGusta(this.idPublicacion, this.nombreUsuario);
  }
  actualizarPublicacion(publicacion:Publicacion){
    this.publicacion = publicacion;
    this.publicacionService.setPublicacion = publicacion;
  }

  redirigirAPerfilUsuario(nombreUsuario:string){
    let nombreUsuarioActual;

    this.perfilUsuarioService.getNombreUsuarioActual.subscribe(nombreUsuarioSub =>{
      nombreUsuarioActual = nombreUsuarioSub;
    })

    if(nombreUsuarioActual != nombreUsuario){
      this.perfilUsuarioService.setPerfilUsuario = null;
      this.perfilUsuarioService.setNombreUsuarioActual = nombreUsuario;
    }
    this.router.navigate(["/bp-perfil", nombreUsuario]);
  }

  calcularAntiguedadFecha(fecha:Date){
    let date = new Date(fecha);
    return formatDistance(date, new Date(), {locale:es});
  }

  abrirResponder(){
    this.responder = true;
  }

  anadirComentario(comentario:Comentario){
    this.publicacion.comentarios.push(comentario);
    console.log(JSON.stringify(comentario) +  "SOY COMENTARIO")
  }
}
