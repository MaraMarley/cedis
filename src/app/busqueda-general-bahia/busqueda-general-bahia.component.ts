import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProcesosCedisService } from '../service/procesos-cedis.service';

@Component({
  selector: 'app-busqueda-general-bahia',
  imports: [CommonModule],
  templateUrl: './busqueda-general-bahia.component.html',
  styleUrl: './busqueda-general-bahia.component.css'
})
export class BusquedaGeneralBahiaComponent implements OnInit {

  constructor(private router: Router, private service: ProcesosCedisService) { }

  title: string = 'Cajas';
  bahia: string = 'Bahía';
  tienda: string = 'Tienda';
  escaneadas: string = 'Escaneadas';
  showTable = true;
  showResponse = false;
  orden: number = 0;
  tda: number = 0;

  data: any[] = [
    {
      bahia: 1, tienda: 3000, escaneadas: 300
    }, {
      bahia: 2, tienda: 4000, escaneadas: 200
    }, {
      bahia: 3, tienda: 5000, escaneadas: 100
    }, {
      bahia: 4, tienda: 6000, escaneadas: 400
    }
  ]

  ngOnInit() {
    this.service.getConsultaGeneralDeBahias().subscribe(resp => {
      console.log('respuesta: ', resp);
      this.orden = resp.orden;
      this.tda = resp.tda; 
      if (resp != '' || resp != null) {
        this.showTable = true;
        this.showResponse = false;
      }
      else {
        return;
      }
    });
  }

  ShowGeneralReport() {
    this.showTable = true;
    this.showResponse = false;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault();
      this.ShowGeneralReport();
    }
    if (event.key === 'F5') {
      event.preventDefault();
      const perfil = '4';
      this.service.setPerfil(perfil);
      this.router.navigate(['/menu']);
    }
  }

  handleClick(item: any) {
    const body = {
      orden:  this.orden,
      tienda: this.tienda
    }
    this.service.getConsultaDetalleDeBahias(body).subscribe(resp => {
      console.log('Respuesta: ', resp);
      if(resp != '' || resp != null){
        this.showTable = false;
       this.showResponse = true;
      }
      else {
        return;
      }      
    });
  }
}
