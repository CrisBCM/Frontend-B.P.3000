import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comentario } from 'src/app/modelo/interfaces/comentario';
import { Persona } from 'src/app/modelo/interfaces/persona';
import { Respuesta } from 'src/app/modelo/interfaces/respuesta';
import { ForoService } from 'src/app/service/foro.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { SharingService } from 'src/app/service/sharing.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-comentario-form',
  templateUrl: './comentario-form.component.html',
  styleUrls: ['./comentario-form.component.css']
})
export class ComentarioFormComponent {

  idUsuario:number;
  tokenDecoded:any;
  urlPerfil!:string;
  @Input() placeholder!:string;
  @Input() idComentario!:number;
  @Input() idPublicacion!:number;
  @Input() respuestaOComentario!:boolean;
  @Output() anadirComentario = new EventEmitter<Comentario>();
  @Output() anadirRespuesta = new EventEmitter<Respuesta>();
  

  constructor(private fb:FormBuilder, private foroService:ForoService, private tokenService:TokenService , private sharingService:SharingService){

    this.sharingService.personaBehaviorSubject.subscribe((persona:Persona | null)=>{

      if(persona?.imgAvatar.path) this.urlPerfil = persona?.imgAvatar.path;
      
    })

    this.tokenService.tokenDecoded$.subscribe(tokenDecoded =>{
      this.tokenDecoded = tokenDecoded;
    })

    console.log("TOKEN DECODED: " + JSON.stringify(this.tokenDecoded));

    this.idUsuario = this.tokenDecoded.persona_id;

    console.log("IDUSUARIO : " + this.idUsuario);
  }

  form = this.fb.group({
    'contenido':['', Validators.required],
  })


  get contenido(){
    return this.form.get("contenido") as FormControl;
  }


  manejarClick(){
    if(this.respuestaOComentario){
      this.enviarComentario();
    }else{
      this.responderComentario();
    }
  }

  enviarComentario(){
    if(!this.form.valid) return;

    const contenido = new FormData();
    contenido.append("contenido", this.contenido.value)

    this.foroService.enviarComentario(this.idPublicacion, this.idUsuario, contenido).subscribe((nuevoComentario:Comentario)=>{
      this.anadirComentario.emit(nuevoComentario);
    })
    this.form.reset();

  }


  responderComentario(){
    if(!this.form.valid) return;

    const contenido = new FormData();
    contenido.append("contenido", this.contenido.value)

    this.foroService.responderComentario(this.idComentario, this.idUsuario, contenido).subscribe((respuesta:Respuesta) =>{
      console.log(this.idComentario);
      this.anadirRespuesta.emit(respuesta);
      
    })
    this.form.reset();
}
  // responderComentario(idComentario:number){
  //   if(!this.form.valid) return;

  //   this.foroService.responderComentario(idComentario, this.idUsuario, this.comentario).subscribe((respuesta:Respuesta) =>{
  //     this.anadirRespuesta.emit(respuesta);
  //   })

  // }

}
