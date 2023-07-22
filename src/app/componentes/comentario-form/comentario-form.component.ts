import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IComentario } from 'src/app/modelo/interfaces/IPublicacion';
import { ForoService } from 'src/app/service/foro.service';
import { LoginServiceService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-comentario-form',
  templateUrl: './comentario-form.component.html',
  styleUrls: ['./comentario-form.component.css']
})
export class ComentarioFormComponent {

  idUsuario:number;
  tokenDecoded:any;
  @Input() idPublicacion!:number;
  @Output() anadirComentario = new EventEmitter<IComentario>();

  constructor(private fb:FormBuilder, private foroService:ForoService, private loginService:LoginServiceService){

    this.tokenDecoded = loginService.tokenDecoded;

    console.log(this.tokenDecoded);

    this.idUsuario = this.tokenDecoded.persona_id;

    console.log(this.idUsuario);
  }

  form = this.fb.group({
    'contenido':['', Validators.required],
  })


  get contenido(){
    return this.form.get("contenido")?.value;
  }

  get comentario(){

    let comentario = {
      "contenido": this.contenido,
      "fecha": new Date()
    }

    return comentario;
  }

  enviarComentario(){
    if(!this.form.valid) return;

    let comentario = this.comentario;

    this.foroService.enviarComentario(this.idPublicacion, this.idUsuario, comentario).subscribe((comentario:IComentario)=>{
      this.anadirComentario.emit(comentario);
    })
    this.form.reset;
  }

}
