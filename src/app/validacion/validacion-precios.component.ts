import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProcesosCedisService } from '../service/procesos-cedis.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validacion-precios',
  imports: [FormsModule, CommonModule],
  templateUrl: './validacion-precios.component.html',
  styleUrl: './validacion-precios.css'
})
export class ValidacionPreciosComponent {
  sku: any = '';
  descripcion: string = '';
  precio: string = '';
  proveedor: string = '';
  estilo: string = '';
  color: string = '';
  tamano: string = '';
  mensaje: string = '';
skuLabel: any;
huboError = false;
 
  constructor(private router: Router, private procesosCedisService: ProcesosCedisService) { }
  @ViewChild('autoResizeText') autoResizeText: any
  ngAfterViewInit() {
    if (this.autoResizeText) {
        this.autoResizeText.nativeElement.focus();
    }
    // setInterval(() => {
    //   const active = document.activeElement;
    //   if (this.autoResizeText && active !== this.autoResizeText.nativeElement) {
    //     this.autoResizeText.nativeElement.focus();
    //   }
    // }, 200);
  }


 
  onEnterPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {            
      this.obtenerDatosProducto(this.sku); 
    }
  }

  obtenerDatosProducto(codigo_escaneo: number): void {
    this.skuLabel =  codigo_escaneo

    this.procesosCedisService.CedisValPrecio(codigo_escaneo).subscribe(
      (respuesta) => {        
        if (respuesta[0].id_error==0) {
          this.huboError = false;
          this.mensaje = respuesta[0].msg_error
          this.descripcion = respuesta[0].descripcion || '';
          this.precio = respuesta[0].precio_venta || '';
          this.proveedor = respuesta[0].proveedor || '';
          this.estilo = respuesta[0].estilo || '';
          this.color = respuesta[0].color || '';
          this.tamano = respuesta[0].tamano || '';
        }
        else {
          this.huboError = true;
          this.mensaje = respuesta[0].msg_error
          this.playBeep();
          this.descripcion = respuesta[0].descripcion || '';
          this.precio = respuesta[0].precio_venta || '';
          this.proveedor = respuesta[0].proveedor || '';
          this.estilo = respuesta[0].estilo || '';
          this.color = respuesta[0].color || '';
          this.tamano = respuesta[0].tamano || '';
        }
      },
      (error) => {
        console.error('Error al obtener los datos del producto', error);
      }
    );    
    this.sku = '';
  }


  manejarEscaneo(event: any): void {
    // Limpiar los datos previos antes de hacer la llamada al servicio
    this.descripcion = '';
    this.precio = '';
    this.proveedor = '';
    this.estilo = '';
    this.color = '';
    this.tamano = '';
    this.mensaje = '';

    this.sku = event.target.value; // Asignar el nuevo SKU escaneado

    const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true
    });
    document.dispatchEvent(enterEvent); 
  }


  // este codigo es el que Evelyn genero
  // manejarEscaneo(event: any): void {
  //   this.sku = event.target.value;
  //   const enterEvent = new KeyboardEvent('keydown', {
  //       key: 'Enter',
  //       bubbles: true,
  //       cancelable: true
  //   });
  //   document.dispatchEvent(enterEvent); 
  // }

  playBeep(): void {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine'; // Tipo de onda
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frecuencia del beep
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Volumen

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 1000); 
    
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault();
      const perfil = '1';
      this.procesosCedisService.setPerfil(perfil);    
      this.router.navigate(['/menu']);
    }
  }
}
