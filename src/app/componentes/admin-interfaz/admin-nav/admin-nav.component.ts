import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  paginaActual:string = "";
  constructor(private router:Router){
    this.paginaActual = router.url.substring(7).toLocaleLowerCase();
  }
}
