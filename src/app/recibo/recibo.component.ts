import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { ProcesosCedisService } from '../service/procesos-cedis.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recibo',
  imports: [CommonModule],
  templateUrl: './recibo.component.html',
  styleUrl: './recibo.component.css'
})
export class ReciboComponent {
  mensaje: string = '';
  timeout: any;

  constructor(private router: Router, private procesosCedisService: ProcesosCedisService) { }
  @ViewChild('autoResizeTextarea') autoResizeTextarea: any;

  ngAfterViewInit() {
    if (this.autoResizeTextarea) {
      this.autoResizeTextarea.nativeElement.focus();
    }
  }

  public onEnter(textarea: HTMLTextAreaElement): void {
    const codigo_escaner = textarea.value.trim()
    textarea.value = '';
    this.procesosCedisService.CedisRecibo(codigo_escaner).subscribe((response) => {

      if (response[0].id_error == 0) {
        //this.mensaje = response[0].msg_error
        console.log("SUCCESS");
      }
      else {
        this.mensaje = response[0].msg_error
        this.playBeep();
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        //this.mensaje = '';
        textarea.value = '';
      }, 2000);
    });

  }

  resizeTextarea(textarea: HTMLTextAreaElement): void {
    let codigo_escaner = textarea.value.trim();

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    if (codigo_escaner.length > 10) {

      this.procesosCedisService.CedisRecibo(codigo_escaner).subscribe((response) => {

        if (response[0].id_error == 0) {
          this.mensaje = response[0].msg_error
        }
        else {
          this.mensaje = response[0].msg_error
        }

        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
          this.mensaje = '';
          textarea.value = '';
        }, 2000);
      });
    }
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
      event.preventDefault();const perfil = '2';
      this.procesosCedisService.setPerfil(perfil);    
      this.router.navigate(['/menu']);
    }
  }

}
