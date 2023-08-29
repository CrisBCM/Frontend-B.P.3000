import { Component, Input } from '@angular/core';
import { ForoService } from 'src/app/service/foro.service';
import { SharingService } from 'src/app/service/sharing.service';
import { EnumEndpoints } from 'src/app/shared/enum-endpoints';

@Component({
  selector: 'app-boton-like-dislike',
  templateUrl: './boton-like-dislike.component.html',
  styleUrls: ['./boton-like-dislike.component.css']
})
export class BotonLikeDislikeComponent {
  @Input() listaMeGusta!:string[];
  @Input() listaNoMeGusta!:string[];
  @Input() idComentarioORespuesta!:number;
  @Input() comentarioORespuesta:boolean = false;

  nombreUsuario:string = "";

  constructor(private foroService:ForoService, private sharingService:SharingService){
    sharingService.personaBehaviorSubject.subscribe(persona=>{
      if(persona?.nombreUsuario) 
        this.nombreUsuario = persona?.nombreUsuario;
    })
  }

  quitarNombreDeListaMeGusta(){

    let nuevaLista;
      
    nuevaLista = this.listaMeGusta.filter(nombreUsuario => nombreUsuario != this.nombreUsuario);


    this.listaMeGusta = nuevaLista;

  }
  quitarNombreDeListaNoMeGusta(){
    let nuevaLista;
      
    nuevaLista = this.listaNoMeGusta.filter(nombreUsuario => nombreUsuario != this.nombreUsuario);


    this.listaNoMeGusta = nuevaLista;
  }

  meGusta(){
    let url:string;

    this.comentarioORespuesta ? url = EnumEndpoints.meGustaRespuesta : url = EnumEndpoints.meGusta;

    this.foroService.meGusta(url, this.idComentarioORespuesta, this.nombreUsuario).subscribe(()=>{
      console.log("Funciono")
    })
    
    if(this.listaMeGusta.includes(this.nombreUsuario)){

      this.quitarNombreDeListaMeGusta();
    }
    else
    {
      this.quitarNombreDeListaNoMeGusta();
      this.listaMeGusta.push(this.nombreUsuario);
    }
  }

  noMeGusta(){
    let url:string;

    this.comentarioORespuesta ? url = EnumEndpoints.noMeGustaRespuesta : url = EnumEndpoints.noMeGusta;

    this.foroService.noMeGusta(url, this.idComentarioORespuesta, this.nombreUsuario).subscribe(()=>{
      console.log("funciono el nomegusta");
    })

    if(this.listaNoMeGusta.includes(this.nombreUsuario))
    {
      this.quitarNombreDeListaNoMeGusta();
    }
    else
    {
      this.quitarNombreDeListaMeGusta();
      this.listaNoMeGusta.push(this.nombreUsuario);
    }
  }

  noMeGustaRespuesta(){
    let url = EnumEndpoints.noMeGustaRespuesta;
  }
}
