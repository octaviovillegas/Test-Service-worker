import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'UTNFRA-binding',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './binding.html',
  styleUrl: './binding.css'
})
export class Binding {

  public Titulo = 'Ejemplo de binding';
  public numeroUno:number=0;
  public numeroDos!:number;
  public numeroResultado?: any;
  constructor() {}

  CalcularPormedio() {
    this.numeroResultado = (this.numeroUno + this.numeroDos) / 2;
  }
}
