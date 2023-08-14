import { Component, OnDestroy, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Observable, Subscription } from 'rxjs';
import { Imagen } from 'src/app/modelo/clases/imagen';
import { Persona } from 'src/app/modelo/clases/persona';
import { IPublicacion } from 'src/app/modelo/interfaces/IPublicacion';
import { ForoService } from 'src/app/service/foro.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { PersonaService } from 'src/app/service/persona.service';
import { SharingService } from 'src/app/service/sharing.service';

@Component({
  selector: 'app-perfil-section',
  templateUrl: './perfil-section.component.html',
  styleUrls: ['./perfil-section.component.css']
})
export class PerfilSectionComponent implements OnInit, OnDestroy{
  persona$!:Observable<Persona | null>;
  totalConsumido$!:Observable<number>;
  totalConsumido!:number;
  limiteDelDia!:number;
  imagen:any;
  subscriptionPersona!:Subscription;
  idPersona!:number;
  constructor(private personaService:PersonaService, private sharingService:SharingService, private foroService:ForoService){
    
  }
  

  ngOnInit(): void {
    this.sharingService.cargarPersona();
    
    this.persona$ = this.sharingService.personaBehaviorSubject;

    this.totalConsumido$ = this.sharingService.obtenerTotalConsumido;

    this.subscriptionPersona = this.persona$.subscribe(data =>{

      // this.sharingService.tokenDecoded.subscribe(tokenDecoded =>{
      //   this.idPersona = tokenDecoded;
      // })

      if(data){
        this.limiteDelDia = this.personaService.getDeficitCalorico(data.pesoCorporal, data.cantidadActividad);
      }

    });

    this.totalConsumido$.subscribe(totalConsumido =>{
      this.totalConsumido = totalConsumido;
    })
  }

  ngOnDestroy(): void {
    console.log("se ejecuto el ngOnDestroy")
    this.subscriptionPersona.unsubscribe();
  }

  cambiarAvatar(event:any, persona:Persona){
    if(confirm("Estas seguro?")){

      const img = event.target.files[0];

      const formImagen = new FormData();

      formImagen.append("imagen", img);

      this.personaService.cambiarAvatar(persona.nombreUsuario, formImagen).subscribe((nuevaImagen:Imagen) =>{

        console.log("no me bugeo")

        persona.imgAvatar = nuevaImagen;

        this.sharingService.cambiarImagenPersona = persona;
      })
    }

    
  }

}
