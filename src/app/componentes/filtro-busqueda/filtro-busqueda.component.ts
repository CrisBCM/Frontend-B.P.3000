import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styleUrls: ['./filtro-busqueda.component.css']
})
export class FiltroBusquedaComponent {
  @Output() emitFiltro = new EventEmitter<string>;
  palabraFiltro:string = "";

  constructor(){}

  emitirFiltro(){
    console.log("EMITIENDO FILTRO");
    this.emitFiltro.emit(this.palabraFiltro);
  }

}
