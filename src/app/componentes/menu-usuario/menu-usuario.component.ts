import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from 'src/app/service/sharing.service';
import { TokenService } from 'src/app/service/token.service';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/modelo/interfaces/persona';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent implements OnInit{

  urlPerfil!:string;

  datosPersona:Observable<Persona | null>;

  constructor(private sharingService:SharingService, private router:Router, private tokenService:TokenService){
    
    this.datosPersona = sharingService.personaBehaviorSubject;
  }
  

  ngOnInit(): void {
    this.sharingService.getPerfilPersona().subscribe((persona:Persona) =>{
      this.sharingService.newPersona = persona;
    })
  }

// ngOnDestroy(): void {
//   this.personaSubscription.unsubscribe();
// }

  cerrarSesion(event:Event){
    event.preventDefault();

    this.tokenService.newCurrentToken ="{}";
    this.tokenService.newTokenDecoded = "{}";
    this.sharingService.newPersona = null;
    
    localStorage.removeItem("usuarioActual");

    this.router.navigate(["/iniciar-sesion"]);
  }
  
}
