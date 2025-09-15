import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaisesService } from '../../servicios/paises-servicio';

@Component({
  selector: 'UTNFRA-paises-listado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paises-listado.html',
  styleUrls: ['./paises-listado.css']
})
export class PaisesListadoComponent implements OnInit {

  public listaPaises: any[] = [];
  public paisesFiltrados: any[] = [];
  public textoBusqueda: string = '';
  public cargando = true;
  public error = false;

  constructor(private paisesService: PaisesService) { }

  ngOnInit(): void {
    this.paisesService.obtenerPaises().subscribe({
      next: (data) => {
        this.listaPaises = data;
        this.paisesFiltrados = data; // Inicializa la lista filtrada con todos los países
        this.cargando = false;
        console.log('Países obtenidos:', this.listaPaises);
      },
      error: (err) => {
        console.error('Error al obtener los países:', err);
        this.cargando = false;
        this.error = true;
      }
    });
  }

  // Función para aplicar el filtro
  aplicarFiltro(): void {
    const textoFiltro = this.textoBusqueda.toLowerCase();
    if (!textoFiltro) {
      this.paisesFiltrados = [...this.listaPaises];
      return;
    }

    this.paisesFiltrados = this.listaPaises.filter(pais =>
      pais.name.official.toLowerCase().includes(textoFiltro) ||
      (pais.capital && Array.isArray(pais.capital) && pais.capital.some((c: string) => c.toLowerCase().includes(textoFiltro))) ||
      (pais.region && pais.region.toLowerCase().includes(textoFiltro))
    );
  }
}
