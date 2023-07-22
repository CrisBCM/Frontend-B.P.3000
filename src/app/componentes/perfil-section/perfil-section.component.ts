import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { Imagen } from 'src/app/modelo/clases/imagen';
import { Persona } from 'src/app/modelo/clases/persona';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { PerfilService } from 'src/app/service/perfil.service';
import { SharingService } from 'src/app/service/sharing.service';

@Component({
  selector: 'app-perfil-section',
  templateUrl: './perfil-section.component.html',
  styleUrls: ['./perfil-section.component.css']
})
export class PerfilSectionComponent implements OnInit{
  persona$!:Observable<Persona | null>;
  totalConsumido$!:Observable<number>;
  totalConsumido!:number;
  limiteDelDia!:number;
  imagen:any;

  constructor(private perfilService:PerfilService, private sharingService:SharingService){
    
  }

  ngOnInit(): void {
    console.log("estoy ejecutando el oninit")
    this.persona$ = this.sharingService.personaBehaviorSubject;
    this.totalConsumido$ = this.sharingService.obtenerTotalConsumido;

    this.persona$.subscribe(data =>{

      if(data){
        this.limiteDelDia = this.perfilService.getDeficitCalorico(data.pesoCorporal, data.cantidadActividad);
      }

    });

    this.totalConsumido$.subscribe(totalConsumido =>{
      this.totalConsumido = totalConsumido;
    })
  }

  cambiarAvatar(event:any, persona:Persona){
    if(confirm("Estas seguro?")){

      const img = event.target.files[0];

      const formImagen = new FormData();

      formImagen.append("imagen", img);

      this.perfilService.cambiarAvatar(persona.nombreUsuario, formImagen).subscribe((nuevaImagen:Imagen) =>{

        persona.imgAvatar = nuevaImagen;

        this.sharingService.cambiarImagenPersona = persona;
      })
    }

    
  }

}
