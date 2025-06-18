import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcesosCedisService } from '../service/procesos-cedis.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-segundo-faltantes',
  imports: [MatListModule, CommonModule],
  templateUrl: './segundo-faltantes.component.html',
  styleUrl: './segundo-faltantes.component.css'
})
export class SegundoFaltantesComponent {
 caja:string = '';
  registro:string = '';
  resultado: any;
  paginaActual: number = 0;
  tamanoPagina: number = 7;
  paginaResultado: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute,private procesosCedisService: ProcesosCedisService){}

  ngOnInit(): void {
    const orden: any = this.route.snapshot.paramMap.get('orden');
    this.procesosCedisService.segundoFaltante(orden).subscribe(resp => {
      this.resultado = resp;

      if (resp.length > 0) {
        this.caja = resp[0].caja;
        this.registro = resp[0].registro;
      }

      this.actualizarPagina(); // Mostrar los primeros 2 registros
    });

    window.addEventListener('keydown', this.manejarTecla.bind(this));
  }

  manejarTecla(event: KeyboardEvent) {
    if (event.key === '3') {
      this.siguientePagina();
    } else if (event.key === '2') {
      this.paginaAnterior();
    }
  }

  actualizarPagina() {
    const inicio = this.paginaActual * this.tamanoPagina;
    const fin = inicio + this.tamanoPagina;
    this.paginaResultado = this.resultado.slice(inicio, fin);
  }

  siguientePagina() {
    const maxPaginas = Math.floor(this.resultado.length / this.tamanoPagina);
    if ((this.paginaActual + 1) * this.tamanoPagina < this.resultado.length) {
      this.paginaActual++;
      this.actualizarPagina();
    }
  }

  paginaAnterior() {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.actualizarPagina();
    }
  }
  
   @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (event.key === '1') {
        event.preventDefault();const perfil = '2';
        this.procesosCedisService.setPerfil(perfil);    
        this.router.navigate(['/segundo-scaner']);
      }
    }
}
