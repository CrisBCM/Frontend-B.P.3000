import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from 'src/app/service/sharing.service';
import { TokenService } from 'src/app/service/token.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Persona } from 'src/app/modelo/interfaces/persona';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent implements OnInit, OnDestroy{

  urlPerfil!:string;
  datosPersona:Observable<Persona | null>;
  onDestroy$:Subject<Boolean> = new Subject();
  tokenDecoded:any;

  constructor(private sharingService:SharingService, private router:Router, private tokenService:TokenService){
    
    this.datosPersona = sharingService.personaBehaviorSubject;
  }
  

  ngOnInit(): void {
    this.sharingService.getPerfilPersona().subscribe((persona:Persona) =>{
      this.sharingService.newPersona = persona;
    })
    this.tokenService.tokenDecoded$.pipe(takeUntil(this.onDestroy$)).subscribe(tokenDecoded =>{
      this.tokenDecoded = tokenDecoded;   
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
  redirigirAPerfilUsuario(){
    console.log(this.tokenDecoded);
    this.router.navigate(["bp-perfil"]);
    this.router.navigate(["/bp-perfil", this.tokenDecoded.nombreUsuario]);
  }

  cerrarSesion(event:Event){
    event.preventDefault();

    this.tokenService.newCurrentToken ="{}";
    this.tokenService.newTokenDecoded = "{}";
    this.sharingService.newPersona = null;
    
    localStorage.removeItem("usuarioActual");

    this.router.navigate(["/iniciar-sesion"]);
  }
  
}
