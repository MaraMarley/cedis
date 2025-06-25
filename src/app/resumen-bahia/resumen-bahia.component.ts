import { Component, HostListener, OnInit } from '@angular/core';
import { ProcesosCedisService } from '../service/procesos-cedis.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen-bahia',
  imports: [CommonModule],
  templateUrl: './resumen-bahia.component.html',
  styleUrl: './resumen-bahia.component.css'
})
export class ResumenBahiaComponent implements OnInit{

   constructor(private router: Router, private service: ProcesosCedisService) { }
  
    title: string = 'Resumen';
    bahia: string = 'Bahía';
    tienda: string = 'Tienda';
    escaneadas: string = 'Escaneadas';
    showTable = true;
    showResponse = false;
    orden: number = 0;
    tda: number = 0;
    miBahia: number = 0;
    caja: string = "Caja";
    inventario: string = "Inventario";
  
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


     data2: any[] = [
      {
        bahia: 1, tienda: 3000, caja: '030005000661883600000001'
      }, {
        bahia: 2, tienda: 4000, caja: '030005000662157100000001'
      }, {
        bahia: 3, tienda: 5000, caja: '030005000660891 100000002 '
      }, {
        bahia: 4, tienda: 6000, caja: '030005000660891 100000001'
      }
    ]
  
    ngOnInit() {
    }
  
    ShowGeneralReport() {
     this.showResponse = false;
     this.showTable = true;
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
       this.showTable = false;
         this.showResponse = true;
      // const body = {
      //   orden:  item.bahia,
      //   tienda: item.tienda
      // }
      // this.service.getConsultaDetalleDeBahias(body).subscribe(resp => {
      //   console.log('Respuesta: ', resp);
      //   if(resp != '' || resp != null){
      //     this.showTable = false;
      //    this.showResponse = true;
      //   }
      //   else {
      //     return;
      //   }      
      // });
    }
}
