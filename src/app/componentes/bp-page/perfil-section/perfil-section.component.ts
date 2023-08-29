import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { PersonaDTO } from 'src/app/dto/persona-dto';
import { Imagen } from 'src/app/modelo/interfaces/imagen';
import { Persona } from 'src/app/modelo/interfaces/persona';
import { ForoService } from 'src/app/service/foro.service';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';
import { PersonaService } from 'src/app/service/persona.service';
import { SharingService } from 'src/app/service/sharing.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-perfil-section',
  templateUrl: './perfil-section.component.html',
  styleUrls: ['./perfil-section.component.css']
})
export class PerfilSectionComponent implements OnInit, OnDestroy{
  persona$!:Observable<Persona | null>;
  usuario$!:Observable<PersonaDTO | null>
  totalConsumido$!:Observable<number>;
  limiteDelDia!:number;
  imagen:any;
  nombreUsuarioParam:string ="";
  tokenDecoded:any;
  onDestroy$:Subject<Boolean> = new Subject();
  perfilAjeno:boolean = false;

  constructor(private personaService:PersonaService, private sharingService:SharingService, private activatedRoute:ActivatedRoute, private tokenService:TokenService, private perfilUsuario:PerfilUsuarioService){}

  ngOnInit(): void {
    this.usuario$ = this.perfilUsuario.getPerfilUsuario;
    this.tokenService.tokenDecoded$.pipe(takeUntil(this.onDestroy$)).subscribe(tokenDecode =>{
      this.tokenDecoded = tokenDecode;
    })

    this.activatedRoute.params.pipe(takeUntil(this.onDestroy$)).subscribe((param:Params) =>{
      this.nombreUsuarioParam = param["nombreUsuario"];

      if(this.tokenDecoded.nombreUsuario == this.nombreUsuarioParam){
        this.perfilAjeno = false;
        this.obtenerPerfilPropio();
      }else{
        this.perfilAjeno = true;
        this.perfilUsuario.obtenerPerfilUsuario(this.nombreUsuarioParam).subscribe((usuario:PersonaDTO) => {
          this.perfilUsuario.setPerfilUsuario = usuario;
        });
        
      }
    })

    
    
  }

  obtenerPerfilPropio(){
    this.persona$ = this.sharingService.personaBehaviorSubject;

    this.totalConsumido$ = this.sharingService.obtenerTotalConsumido;

    this.persona$.pipe(takeUntil(this.onDestroy$)).subscribe(data =>{

      if(data){
        this.limiteDelDia = this.personaService.getDeficitCalorico(data.pesoCorporal, data.cantidadActividad);
      }
    });
  }

  ngOnDestroy(): void {
    console.log("se ejecuto el ngOnDestroy")
    this.onDestroy$.next(true);
  }

  cambiarAvatar(event:any, persona:Persona){
    if(confirm("Estas seguro?")){

      const img = event.target.files[0];

      const formImagen = new FormData();

      formImagen.append("imagen", img);

      this.sharingService.cambiarAvatar(persona.nombreUsuario, formImagen).subscribe((nuevaImagen:Imagen) =>{

        console.log("no me bugeo")

        persona.imgAvatar = nuevaImagen;

        this.sharingService.cambiarImagenPersona = persona;
      })
    }

    
  }

}
