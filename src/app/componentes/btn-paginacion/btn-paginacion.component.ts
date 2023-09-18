import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';

@Component({
  selector: 'app-btn-paginacion',
  templateUrl: './btn-paginacion.component.html',
  styleUrls: ['./btn-paginacion.component.css']
})
export class BtnPaginacionComponent implements OnInit{
  @Input() listaObjetos!: Publicacion[] | null;

  paginaActual:number = 1;

  @Output() emitPaginaActual = new EventEmitter<number>;

  cantidadPaginas:number = 0;

  @Input() cantMostrarPublicaciones:number = 0;

  arrayBotones:number[] = [];

  ultimoElementoEnArray:number = 0;

  isMobile:boolean = window.innerWidth < 400;

  constructor(){
    
  }

  ngOnInit(): void {
    console.log();
    if(this.listaObjetos){
      this.cantidadPaginas = Math.ceil(this.listaObjetos.length / this.cantMostrarPublicaciones);
      console.log(this.cantidadPaginas + " cantidadPaginas")
    }

    for(let i = 1; i <= this.cantidadPaginas; i++){
      this.arrayBotones.push(i);
    }

    if(this.arrayBotones && this.arrayBotones.length > 0){
      this.ultimoElementoEnArray = this.arrayBotones.slice(-1)[0];
    }
    console.log(this.listaObjetos);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    console.log("ESCUCHANDO HOSTLISTENER" + event.target.innerWidth);
    const screenWidth = event.target.innerWidth;
    console.log(screenWidth + " SCREENWIDTH");
    this.isMobile = screenWidth < 470;
  }

  get listaBotones():number[]{
    let cantidadBotones = 0;
    this.isMobile ? cantidadBotones = 1 : cantidadBotones = 4;
    const inicio = this.paginaActual - 1;
    const fin = this.paginaActual + cantidadBotones;
    return this.arrayBotones.slice(inicio, fin);
  }
  cambiarPagina(nuevoNumero:number){
    this.paginaActual = nuevoNumero;
    this.emitPaginaActual.emit(this.paginaActual);
    console.log(this.paginaActual);
  }
}
