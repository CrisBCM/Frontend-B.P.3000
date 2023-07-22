import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { Router } from '@angular/router';
import { SharingService } from 'src/app/service/sharing.service';
import { Persona } from 'src/app/modelo/clases/persona';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent{

  urlPerfil!:string;

  datosPersona:any;

  personaSubscription!:Subscription;

  constructor(private sharingService:SharingService, private router:Router, private loginService:LoginServiceService){
    this.personaSubscription = this.sharingService.personaBehaviorSubject.subscribe((persona:Persona | null)=>{
      if(persona?.imgAvatar.path) this.urlPerfil = persona?.imgAvatar.path;
      
    })
  }


// ngOnDestroy(): void {
//   this.personaSubscription.unsubscribe();
// }

  cerrarSesion(event:Event){
    event.preventDefault();

    this.sharingService.cerrarSesion = null;

    this.loginService.setUsuarioAutenticado = "";

    localStorage.removeItem("usuarioActual");

    this.router.navigate(["/iniciar-sesion"]);
  }
  
}
