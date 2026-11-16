import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent{
  private readonly cacheKey = 'paises-v5';
  termino:string = '';
  error:boolean = false;
  paises:Country[] = [];
  nombrePlaceHolder:string = "Buscar por pais"

  constructor(private paisService:PaisService){
    if(localStorage.getItem(this.cacheKey)){
      this.paises = JSON.parse(localStorage.getItem(this.cacheKey)!);
    }
  }

  buscar(termino:string){
      this.termino = termino;
      this.error = false
      
      this.paisService.buscarPais(termino).
      subscribe(paises => {
      this.paises = paises
      localStorage.setItem(this.cacheKey, JSON.stringify(this.paises))
    },err=> {
      this.error = true;
      if(localStorage.getItem(this.cacheKey)){
        this.paises = JSON.parse(localStorage.getItem(this.cacheKey)!);
      }
    }) ;
  }

  sugerencia(event:any){
    this.termino = event;
    this.error = false;

    if (event.trim().length < 2) {
      return;
    }

    this.paisService.buscarPais(event).
    subscribe(paises => {
    this.paises = paises
    localStorage.setItem(this.cacheKey, JSON.stringify(this.paises))
  },err=> {
    this.error = true;
    if(localStorage.getItem(this.cacheKey)){
    this.paises = JSON.parse(localStorage.getItem(this.cacheKey)!);
    }
  }) ;    
    // TODO:Crear sugerencias
  }
}
