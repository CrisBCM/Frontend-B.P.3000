import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionExpiredService } from 'src/app/service/session-expired.service';

@Component({
  selector: 'app-modal-session-expired',
  templateUrl: './modal-session-expired.component.html',
  styleUrls: ['./modal-session-expired.component.css']
})
export class ModalSessionExpiredComponent {
  sessionExpired:boolean = false;
  constructor(public sessionExpiredSv:SessionExpiredService, private router:Router){
    this.sessionExpiredSv.sessionExpired$.subscribe(session =>{
      this.sessionExpired = session;
    })
  }
}
