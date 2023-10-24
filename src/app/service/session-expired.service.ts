import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionExpiredService {
  sessionExpired:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  get sessionExpired$():Observable<boolean>{
    return this.sessionExpired.asObservable();
  }
  set setSessionExpired(trueFalse:boolean){
    this.sessionExpired.next(trueFalse);
  }
}
