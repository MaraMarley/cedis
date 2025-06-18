import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProcesosCedisService } from '../service/procesos-cedis.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calidad',
  imports: [CommonModule],
  templateUrl: './calidad.component.html',
  styleUrl: './calidad.component.css'
})
export class CalidadComponent {
  mensaje: string = '';
  timeout: any;

  constructor(private router: Router, private procesosCedisService: ProcesosCedisService){}

  @ViewChild('autoResizeTextarea') autoResizeTextarea: any;
  
  ngAfterViewInit() {
    if (this.autoResizeTextarea) {
        this.autoResizeTextarea.nativeElement.focus();
    }
    // setInterval(() => {
    //   const active = document.activeElement;
    //   if (this.autoResizeTextarea && active !== this.autoResizeTextarea.nativeElement) {
    //     this.autoResizeTextarea.nativeElement.focus();
    //   }
    // }, 200);
  }
  
  public onEnter(textarea: HTMLTextAreaElement): void {
    const codigo_escaner = textarea.value.trim()
    textarea.value = '';
    this.procesosCedisService.CedisCalidad(codigo_escaner).subscribe((response) => {

      if (response[0].id_error == 0) {
        this.mensaje = '';
        
        // this.playBeep();     
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

      this.procesosCedisService.CedisCalidad(codigo_escaner).subscribe((response) => {

        if (response[0].id_error == 1) {
          this.mensaje = response[0].msg_error
        }
        else {
          this.mensaje = response[0].msg_error
          this.playBeep();
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
      event.preventDefault();  
      const perfil = '1'
      this.procesosCedisService.setPerfil(perfil);    
      this.router.navigate(['/menu']); 
    }
  }
}
