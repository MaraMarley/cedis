import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProcesosCedisService } from '../service/procesos-cedis.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu',
  imports: [RouterModule, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  perfilSeleccionado: string = '';
  tituloHeader: string = 'Información Corporativa.';
  cedisTitulo: string = 'CEDIS';
  calidad: boolean = false;
  recibo: boolean = false;
  embarques: boolean = false;
  bahia: boolean = false;
  perfilNombre: string = '';
  perfil: any;
  constructor(private router: Router, private service: ProcesosCedisService) {  
  }

  ngOnInit() {
    this.perfilSeleccionado = this.service.getPerfil();
    switch (this.perfilSeleccionado) {
      case '1':
        this.perfilSeleccionado;
        this.perfilNombre = 'CALIDAD';
        this.calidad = true;
        this.recibo;
        this.embarques;
        this.bahia;
        break;
      case '2':
        this.perfilSeleccionado;
        this.perfilNombre = 'RECIBO';
        this.calidad;
        this.recibo = true;
        this.embarques;
        this.bahia;
        break;
      case '3':
        this.perfilSeleccionado;
        this.perfilNombre = 'EMBARQUE';
        this.calidad;
        this.recibo;
        this.embarques = true;
        this.bahia;
        break;
      case '4':
        this.perfilSeleccionado;
        this.perfilNombre = 'BAHÍA';
        this.calidad;
        this.recibo;
        this.embarques;
        this.bahia = true;
        break;
    }
    this.service.clearPerfil();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault(); 0
      this.perfil = this.service.getPerfil();
      this.router.navigate(['']);
    }
  }

}
