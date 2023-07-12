import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { Persona } from 'src/app/modelo/clases/persona';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { PerfilServiceService } from 'src/app/service/perfil-service.service';
import { SharingService } from 'src/app/service/sharing.service';

@Component({
  selector: 'app-perfil-section',
  templateUrl: './perfil-section.component.html',
  styleUrls: ['./perfil-section.component.css']
})
export class PerfilSectionComponent implements OnInit{
  persona$!:Observable<Persona | null>;
  totalConsumido$:Observable<number>;
  totalConsumido!:number;
  limiteDelDia!:number;

  constructor(private perfilService:PerfilServiceService, private sharingService:SharingService){
    this.persona$ = this.sharingService.personaBehaviorSubject;
    this.totalConsumido$ = this.sharingService.obtenerTotalConsumido;
  }

  ngOnInit(): void {
    
    this.persona$.subscribe(data =>{

      if(data){
        this.limiteDelDia = this.perfilService.getDeficitCalorico(data.pesoCorporal, data.cantidadActividad);
      }

    });

    this.totalConsumido$.subscribe(totalConsumido =>{
      this.totalConsumido = totalConsumido;
    })
  }

}
