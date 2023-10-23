import { Component } from '@angular/core';
import { SessionExpiredService } from 'src/app/service/session-expired.service';

@Component({
  selector: 'app-modal-session-expired',
  templateUrl: './modal-session-expired.component.html',
  styleUrls: ['./modal-session-expired.component.css']
})
export class ModalSessionExpiredComponent {
  sessionExpired:boolean = false;
  constructor(private sessionExpiredSv:SessionExpiredService){
    this.sessionExpiredSv.sessionExpired$.subscribe(session =>{
      this.sessionExpired = session;
    })
  }
}
