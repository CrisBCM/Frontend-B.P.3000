import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-group',
  templateUrl: './btn-group.component.html',
  styleUrls: ['./btn-group.component.css']
})
export class BtnGroupComponent {
  @Output() switchModalEliminar = new EventEmitter<boolean>;
  @Output() switchEditar = new EventEmitter<boolean>;
  
  constructor(){}
  
}
