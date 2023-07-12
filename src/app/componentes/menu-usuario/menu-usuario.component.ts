import { Component, OnInit } from '@angular/core';
import { PerfilSectionComponent } from '../perfil-section/perfil-section.component';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { PerfilServiceService } from 'src/app/service/perfil-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent implements OnInit{

  urlPerfil!:string;

  datosPersona:any;

  constructor(private PerfilService:PerfilServiceService, private router:Router, private loginService:LoginServiceService){

  }

  ngOnInit(): void {
    this.PerfilService.getPerfilPersona().subscribe(data=>{

      this.urlPerfil = data.urlAvatar;
      
    })
  }

  cerrarSesion(event:Event){
    event.preventDefault();

    this.loginService.usuarioActual.next("");

    localStorage.removeItem("usuarioActual");

    this.router.navigate(["/iniciar-sesion"]);
  }
  
}
