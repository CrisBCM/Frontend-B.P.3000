import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Comida } from 'src/app/modelo/interfaces/comida';
import { Imagen } from 'src/app/modelo/interfaces/imagen';
import { Persona } from 'src/app/modelo/interfaces/persona';
import { ComidaService } from 'src/app/service/comida.service';
import { SharingService } from 'src/app/service/sharing.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy{
  toggleAdd:boolean = false;
  toggleEditar:boolean = false;

  header:string = "Consumo";

  comidaSeleccionada:number = -111;

  image:any;

  persona$!:Observable<Persona | null>;

  persona!:Persona;

  formNuevaComida:FormGroup;

  onDestroy$:Subject<Boolean> = new Subject();

  constructor(private fb:FormBuilder, private comidaService:ComidaService, private sharingService:SharingService){
    this.formNuevaComida = fb.group({
      nombreComida:["", Validators.required],
      calorias:["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.persona$ = this.sharingService.personaBehaviorSubject;

    this.persona$.pipe(takeUntil(this.onDestroy$)).subscribe((persona:Persona | null) =>{

     if(persona){
      this.persona = persona;
      this.setTotalConsumido();
     }
    })
    
  }

  ngOnDestroy(): void {
    console.log("main componente destruyendose!")
    this.onDestroy$.next(true);
  }

  get nombreComida(){
    return this.formNuevaComida.get("nombreComida") as FormControl;
  }

  get calorias(){
    return this.formNuevaComida.get("calorias") as FormControl;
  }

  seleccionarComida(idComida:number){
    switch(this.comidaSeleccionada){
      case idComida:
        this.comidaSeleccionada = -1111;
        break;
      default:
        this.comidaSeleccionada = idComida;
    }
    
  }

  crearComida(com:any){
    let imagen:Imagen = {
      id : com.imagen.id,
      nombre : com.imagen.nombre,
      path : com.imagen.path
    };
        
    let comida:Comida = {
      id : com.id,
      nombreComida : com.nombreComida,
      calorias : com.calorias,
      imagen: imagen
    }

    return comida;
  }

  cambiarToggleAdd(){
    this.formNuevaComida.reset();
    if(this.toggleAdd){
      this.toggleAdd = false;
      this.header = "Consumo"
    }else{
      this.toggleAdd = true;
      this.header = "Añadir Comida"
    }

  }

  cambiarToggleEditar(event:Event){
    this.stopPropagation(event);
    this.toggleEditar ? this.toggleEditar = false : this.toggleEditar = true;
  }
  stopPropagation(event:Event){
    event.stopPropagation();
  }

  obtenerImagen(event:any){
    const image = event.target.files[0];
    
    this.image = image;

    console.log(this.image);
  }

  subirComida(event:Event){
    event.preventDefault

    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');

    const options = { headers: headers };

    if (this.image){
      const formData = new FormData();

        if(this.nombreComida && this.calorias){
          formData.append("nombreComida", this.nombreComida.value);
          formData.append("calorias", this.calorias.value);
        }

      formData.append("imagen", this.image);

      let estomagoId:number;

      if(this.persona?.estomago){
        estomagoId = this.persona.estomago.id

        this.comidaService.subirComida(formData, estomagoId, this.persona?.nombreUsuario, options).subscribe(data =>{

          console.log("soy estomago id  " + estomagoId);
  
          let nuevaComida = this.crearComida(data);
          console.log(data);
  
          this.persona?.estomago.comidas.push(nuevaComida);

          this.sharingService.cambiarImagenPersona = this.persona;
  
          this.setTotalConsumido();
          this.image = null;
          console.log("soy dataaaa: "+ JSON.stringify(nuevaComida));
        })
      }
      
    }
  }
  editarComida(){

    const formData = new FormData();
    if(this.formNuevaComida.valid && confirm("Estas seguro que deseas editar esta comida?")){

      if(this.image){
        formData.append("imagen", this.image);
      }

      formData.append("nombreComida", this.nombreComida.value);
      formData.append("calorias", this.calorias.value);

      if(this.persona.estomago){

        let estomagoId = this.persona.estomago.id;

        this.comidaService.editarComida(estomagoId, formData, this.persona.nombreUsuario, this.comidaSeleccionada).subscribe(data =>{

          console.log(JSON.stringify(data));
  
          const indiceComida = this.persona.estomago.comidas.findIndex(comida => comida.id == this.comidaSeleccionada);
  
          let nuevaListaComida = [...this.persona.estomago.comidas];
  
          let comida:Comida = nuevaListaComida[indiceComida];
  
          comida.nombreComida = data.nombreComida;
          comida.calorias = data.calorias;
          comida.imagen.nombre = data.imagen.nombre;
          comida.imagen.path = data.imagen.path;
  
          this.persona.estomago.comidas = nuevaListaComida;
          this.sharingService.cambiarImagenPersona = this.persona;
          
          this.setTotalConsumido();
        })
      }

    }else{
      console.log("form Invalido!");
    }

    
  }
  eliminarComida(idEstomago:number, idComida:number){

    if(confirm("Estas seguro que deseas eliminar esta comida?")){

      this.comidaService.eliminarComida(idEstomago, idComida).subscribe( ()=>{
        
        this.persona.estomago.comidas = this.persona.estomago.comidas.filter(comida => comida.id !== idComida);

        this.sharingService.cambiarImagenPersona = this.persona;

        this.setTotalConsumido();

        console.log("exitoso!");
      });
    };

  }

  obtenerTotalConsumido(listaComida:Array<Comida>){
    let consumoTotal:number = 0;

    for (let comida of listaComida){
      consumoTotal += comida.calorias;
    }

    return consumoTotal;
  }

  setTotalConsumido(){
    let arrayComida = this.persona?.estomago.comidas;

    let consumoTotal:number = this.obtenerTotalConsumido(arrayComida);

    this.sharingService.totalConsumido = consumoTotal;
  }
}
            