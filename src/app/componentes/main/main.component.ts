import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Comida } from 'src/app/modelo/clases/comida';
import { Estomago } from 'src/app/modelo/clases/estomago';
import { Imagen } from 'src/app/modelo/clases/imagen';
import { Persona } from 'src/app/modelo/clases/persona';
import { MainService } from 'src/app/service/main.service';
import { PerfilService } from 'src/app/service/perfil.service';
import { SharingService } from 'src/app/service/sharing.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  toggleAdd:boolean = false;
  toggleEditar:boolean = false;

  header:string = "Consumo";

  comidaSeleccionada!:number;

  image:any;

  persona$:Observable<Persona | null>;

  nombreUsuario!:string;

  estomago!:Estomago;

  constructor(private fb:FormBuilder, private mainService:MainService, private sharingService:SharingService){
    this.persona$ = sharingService.personaBehaviorSubject;

    this.persona$.subscribe(data =>{
      if(data?.nombreUsuario){
        this.nombreUsuario = data?.nombreUsuario;
      }
      if(data?.estomago){
        this.estomago = data.estomago;
        this.sharingService.totalConsumido = this.estomago.totalConsumido;
      }
    })

  }
  ngOnInit(): void {
  }

  form = this.fb.group({
    nombreComida:["", Validators.required],
    calorias:["", Validators.required]
  });

  get nombreComida(){
    return this.form.get("nombreComida") as FormControl;
  }

  get calorias(){
    return this.form.get("calorias") as FormControl;
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
    let imagen = new Imagen(com.imagen.id, com.imagen.nombre, com.imagen.path);
        
    let comida = new Comida(com.id, com.nombreComida, com.calorias, imagen);

    return comida;
  }

  cambiarToggleAdd(){
    this.form.reset();
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

      this.mainService.subirComida(formData, this.estomago.id, this.nombreUsuario, options).subscribe(data =>{

        console.log("soy estomago id  " + this.estomago.id);
        let nuevaComida = this.crearComida(data);

        this.estomago.listaComida.push(nuevaComida);

        this.setTotalConsumido();
        this.image = null;
        console.log("soy dataaaa: "+ JSON.stringify(nuevaComida));
      })
    }
  }
  editarComida(){

    const formData = new FormData();
    if(this.form.valid && confirm("Estas seguro que deseas editar esta comida?")){

      if(this.image){
        formData.append("imagen", this.image);
      }

      this.mainService.editarComida(this.estomago.id, formData, this.nombreUsuario, this.comidaSeleccionada).subscribe(data =>{

        console.log(JSON.stringify(data));

        const indiceComida = this.estomago.listaComida.findIndex(comida => comida.id == this.comidaSeleccionada);

        let nuevaListaComida = [...this.estomago.listaComida];

        let comida:Comida = nuevaListaComida[indiceComida];

        comida.nombreComida = data.nombreComida;
        comida.calorias = data.calorias;
        comida.imagen.nombre = data.imagen.nombre;
        comida.imagen.path = data.imagen.path;

        this.estomago.listaComida = nuevaListaComida;
        this.setTotalConsumido();
      })

    }else{
      console.log("form Invalido!");
    }

    
  }
  eliminarComida(idEstomago:number, idComida:number){

    if(confirm("Estas seguro que deseas eliminar esta comida?")){

      this.mainService.eliminarComida(idEstomago, idComida).subscribe( ()=>{
        
        this.estomago.listaComida = this.estomago.listaComida.filter(comida => comida.id !== idComida);

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
    let arrayComida = this.estomago.listaComida;

    let consumoTotal:number = this.obtenerTotalConsumido(arrayComida);

    this.sharingService.totalConsumido = consumoTotal;
  }
}
            