import { Component } from '@angular/core';
import { PersonaDTO } from 'src/app/dto/persona-dto';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {
  
  private nombreUsuario!:string;

  constructor(private perfilUsuario:PerfilUsuarioService, activatedRoute:ActivatedRoute){

    activatedRoute.params.subscribe((param:Params)=>{

      this.nombreUsuario = param["nombreUsuario"];

      console.log(param["nombreUsuario"]);
    })
    
    perfilUsuario.obtenerPerfilUsuario(this.nombreUsuario).subscribe((usuario:PersonaDTO) => {

      this.perfilUsuario.setPerfilUsuario = usuario;
      
    })

  }
}
