import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginServiceService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  usuarioAutenticado:any;
  constructor(private loginService:LoginServiceService){

    this.loginService.usuarioAutenticado.subscribe(usuario=>{
      this.usuarioAutenticado = usuario;
    });
    console.log("SOY USUARIO AUTENTICADO  " + JSON.stringify(this.usuarioAutenticado))
  }

}
