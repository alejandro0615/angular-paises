import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent{
  private readonly cacheKey = 'capitales-v5';
  termino:string = '';
  error:boolean = false;
  capitales:Country[] = [];


  constructor(private paisService:PaisService){
    if(localStorage.getItem(this.cacheKey)){
      this.capitales = JSON.parse(localStorage.getItem(this.cacheKey)!);
    }
  }

  buscar(termino:string){
      this.termino = termino;
      this.error = false
      
      this.paisService.buscarCapital(termino).
      subscribe(capitales => {
      this.capitales = capitales
      localStorage.setItem(this.cacheKey, JSON.stringify(this.capitales))
    },err=> {
      this.error = true;
      if(localStorage.getItem(this.cacheKey)){
        this.capitales = JSON.parse(localStorage.getItem(this.cacheKey)!);
      }
    }) ;
  }

  sugerencia(event:any){
    this.termino = event;
    this.error = false;

    if (event.trim().length < 2) {
      return;
    }

    this.paisService.buscarCapital(event).
    subscribe(paises => {
    this.capitales = paises
    localStorage.setItem(this.cacheKey, JSON.stringify(this.capitales))
  },err=> {
    this.error = true;
    if(localStorage.getItem(this.cacheKey)){
      this.capitales = JSON.parse(localStorage.getItem(this.cacheKey)!);
    }
  }) ;    
    // TODO:Crear sugerencias
  }

}
