import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filtro-dropdown',
  templateUrl: './filtro-dropdown.component.html',
  styleUrls: ['./filtro-dropdown.component.css']
})
export class FiltroDropdownComponent {
  @Input() nombreFiltro:string = "";
  @Input() opcionesDeFiltro: string[] = [];
  @Output() filtrar = new EventEmitter<string>;
  switchFiltro:boolean = false;

  constructor(){}
  
  emitirFiltro(tipoDeFiltro:string){
    this.filtrar.emit(tipoDeFiltro);
  }
}
