import { Component } from '@angular/core';
import { SessionExpiredService } from './service/session-expired.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'baja-panzas-3000';
  sessionExp:boolean = false;
  constructor(sessionExpSv:SessionExpiredService){
    sessionExpSv.sessionExpired$.subscribe(sessionExp =>{
      this.sessionExp = sessionExp;
    })
  }
}
