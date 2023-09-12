import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PersonaDTO } from 'src/app/dto/persona-dto';
import { Comida } from 'src/app/modelo/interfaces/comida';
import { Imagen } from 'src/app/modelo/interfaces/imagen';
import { Persona } from 'src/app/modelo/interfaces/persona';
import { ComidaService } from 'src/app/service/comida.service';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';
import { SharingService } from 'src/app/service/sharing.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy{
  persona$!:Observable<Persona | null> | null;
  onDestroy$:Subject<Boolean> = new Subject();
  tokenDecoded:any;
  nombreUsuarioParam:string = "";
  perfilAjeno:boolean = false;
  navOpcion:string = "";
  personaOUsuarioExiste:boolean = false;

  constructor(private sharingService:SharingService, private activatedRoute:ActivatedRoute, private tokenService:TokenService, private perfilUsuario:PerfilUsuarioService){}

  ngOnInit(): void {
    this.tokenService.tokenDecoded$.pipe(takeUntil(this.onDestroy$)).subscribe(tokenDecoded =>{
      this.tokenDecoded = tokenDecoded;
    })
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy$)).subscribe((param:Params)=>{
      this.nombreUsuarioParam = param["nombreUsuario"];

      if(this.tokenDecoded.nombreUsuario == this.nombreUsuarioParam){
        this.perfilAjeno = false;
        
        this.obtenerPerfilPropio();
        this.navOpcion = "consumo";
      }else{
        this.persona$ = null;
        this.navOpcion = "publicaciones"

        this.perfilUsuario.obtenerPerfilUsuario(this.nombreUsuarioParam).subscribe((usuario:PersonaDTO) => {
  
        this.perfilUsuario.setPerfilUsuario = usuario;
        });
  
        this.perfilAjeno = true;
      }
      
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  obtenerPerfilPropio(){
    this.persona$ = this.sharingService.personaBehaviorSubject;
  }
}
            