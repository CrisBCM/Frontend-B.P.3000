import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { SharingService } from 'src/app/service/sharing.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  usuarioAutenticado:any;

  constructor(private tokenService:TokenService){}
  
  ngOnInit(): void {
    this.tokenService.currentToken.subscribe(tokenObject =>{
      this.usuarioAutenticado = tokenObject;
      console.log(JSON.stringify(this.usuarioAutenticado));
    })
  }

}
