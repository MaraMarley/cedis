import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iembarqes } from '../interfaces/iembarqes';
import { ProcesosCedisService } from '../service/procesos-cedis.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manifestos',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manifestos.component.html',
  styleUrl: './manifestos.component.css'
})
export class ManifestosComponent {
  embarque: Iembarqes;
  form: FormGroup;
  titulo: string = 'Manifiestos';
  subtitulo: string = "";
  folio: any;
  mensaje: string = '';
  validacion = false;
  isFolioReadonly = false;
  show = false;
  dataScaner:any;
  F3folio:any;
  F3mensajeerror:any;
  F3totales: any;
  F3escaneadas:any;
  F3tienda: any;

  @ViewChild('EscanearcajaInput') escanearcajaInput!: ElementRef;
  
    constructor(private router: Router, private service: ProcesosCedisService) {        
      this.form = new FormGroup({
        folio: new FormControl(''),
      });
      this.embarque = {
        proceso : 0,
        folio_embarque: '', 
        id_tienda: '',
        etiqueta_caja:''
      };
    }
    async onSubmit() {  
      // const baseUrl =  `http://192.168.101.10:81`
      const baseUrl =  `http://localhost:5219`
      let url = baseUrl
      this.folio = this.form.get("folio")?.value;
      if( this.folio !== '' ){
        try{
          url = `${baseUrl}/api/cedis/manifiesto1/${this.folio.trim()}.pdf`
          // void await this.descargarArchivo(url,this.folio.trim(),"manifiesto")
          void await this.descargarArchivo(url,this.folio.trim(),"manifiesto")
        }catch{
          return
        }        
        url = `${baseUrl}/api/cedis/manifiesto3/${this.folio.trim()}.pdf`
        void await this.descargarArchivo(url,this.folio.trim(),"itinerario")        
        //obtener tiendas
        url = `${baseUrl}/api/cedis/tiendas/${this.folio.trim()}`
        let tiendas = await this.obtenerTiendas(url)
        tiendas.forEach(async (tienda) => {
           url = `${baseUrl}/api/cedis/manifiesto2/${this.folio.trim()}_${tienda.Tienda.trim()}.pdf`
           void await this.descargarArchivo(url,this.folio.trim(),`detalle_${tienda.Tienda.trim()}`)
        });        
      }else{
        alert('Captura Embarque')
      }
    }

    async obtenerTiendas(url: string): Promise<any[]> {
      try {
        const response = await fetch(url); 
        if (!response.ok) {
          throw new Error('Error al obtener las tiendas');
        }    
        const data = await response.json();
        console.log('Lista de Tiendas:', data);
        return data;
      } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        return [];
      }
    }
        
    async descargarArchivo(url: string, embarque: string, tipo: string) {
      try {        
        const response = await fetch(url);
    
        if (!response.ok) {
          throw new Error('Error al obtener el archivo');
        }
        const blob = await response.blob();
        const objectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = `${embarque}_${tipo}.pdf`;
    
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        window.URL.revokeObjectURL(objectUrl);
    
      } catch (error) {
        console.error('Error al descargar el archivo:', error);
        if(tipo === 'manifiesto'){
          alert(`No existe el manifiesto para el embarque: ${embarque}`);
          throw new Error(`No 2existe el manifiesto para el embarque: ${embarque}`);
        }
      }
    }  
    
    @HostListener('document:keydown', ['$event'])
      handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'F1') {
          event.preventDefault();
          event.preventDefault(); event.preventDefault();const perfil = '3';
          this.service.setPerfil(perfil);    
          this.router.navigate(['/menu']);
        }        
      }
}
