import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcesosCedisService } from '../service/procesos-cedis.service';

@Component({
  selector: 'app-avance-recibo',
  imports: [FormsModule, CommonModule],
  templateUrl: './avance-recibo.component.html',
  styleUrl: './avance-recibo.component.css'
})
export class AvanceReciboComponent {
  codigo_escaner: string = '';
  timeout: any;
  mensaje: string = '';

  esperado: number = 0;
  recibo: number = 0;
  diferencia: number = 0;

  constructor(private router: Router, private procesosCedisService: ProcesosCedisService) { }

  enviarCierre() {
    console.log('entro')

    this.procesosCedisService.CedisAvanceRec(this.codigo_escaner).subscribe((response) => {

      if (response[0].id_error == 0) {
        //this.mensaje = response[0].msg_error
        this.esperado = response[0].ln1
        this.recibo = response[0].ln2
        this.diferencia = response[0].ln3
      }
      else {
        this.mensaje = response[0].msg_error
        this.playBeep();
        this.esperado = response[0].ln1
        this.recibo = response[0].ln2
        this.diferencia = response[0].ln3
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        //this.codigo_escaner = '';
        //this.mensaje = '';
      }, 2000);
    });

  }

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
    }, 1000); // Duración del beep en milisegundos
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault();
      event.preventDefault(); event.preventDefault();const perfil = '2';
      this.procesosCedisService.setPerfil(perfil);    
      this.router.navigate(['/menu']);
    }
  }
}
