import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProcesosCedisService } from '../service/procesos-cedis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primer-scaner',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './primer-scaner.component.html',
  styleUrl: './primer-scaner.component.css'
})
export class PrimerScanerComponent {

  msgError: string = '';
  msNogError: string = '';
  ultimaCajaEscaneada: string = '';
  version: string = '';
  orden: string = '';
  caja: string = '';
  de: string = '';
  opciones: string = '';

  @ViewChild('cajaInput', { static: true }) cajaInput!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private procesosCedisService: ProcesosCedisService
  ) { }

  ngAfterViewInit(): void {
    const from = this.procesosCedisService.getPreviousUrl();

    if (from === '/menu') {
      return;
    }   
    this.focusInput();

    const datos = this.procesosCedisService.obtenerDatosPrimerEscaneo();
    if (datos) {
      this.version = datos.version;
      this.orden = datos.orden;
      this.caja = datos.escaneadas;
      this.de = datos.esperadas;
      this.ultimaCajaEscaneada = datos.codigo ?? '';
      this.opciones = datos.opciones;
  
      if (datos.error_id != 0) {
        this.msgError = datos.error_msg;
        this.msNogError = '';
      } else {
        this.msgError = '';
        this.msNogError = datos.error_msg;
      }
    }
  }

  private focusInput(): void {
    setTimeout(() => {
      this.cajaInput?.nativeElement?.focus();
    }, 100);
  }

  public onEnter(input: HTMLInputElement): void {
    const valor = input.value.trim();

    if (!valor) {
      this.focusInput();
      return;
    } else {
      this.procesosCedisService.primerEscaneo(valor).subscribe(resp => {
        this.version = resp[0].version;
        this.orden = resp[0].orden;
        this.caja = resp[0].escaneadas;
        this.de = resp[0].esperadas;
        this.ultimaCajaEscaneada = valor;
        this.opciones = resp[0].opciones;

        
        this.procesosCedisService.guardarDatosPrimerEscaneo(resp[0]);


        if (resp[0].error_id != 0) {
          this.playIntermittentBuzzer();
          this.msgError = resp[0].error_msg;
          this.msNogError = '';

        } else {
          this.msgError = '';
          this.msNogError = resp[0].error_msg;
        }
        input.value = '';
        this.focusInput();
      })
    }
    input.value = '';
    this.focusInput();
  }

  public onFocusOut(): void {
    setTimeout(() => {
      const active = document.activeElement;
      if (active !== this.cajaInput.nativeElement) {
        this.focusInput();
      }
    }, 150);
  }

  playIntermittentBuzzer(): void {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();

    let isOn = false;
    const interval = setInterval(() => {
      isOn = !isOn;
      gainNode.gain.setValueAtTime(isOn ? 1 : 0, audioContext.currentTime);
    }, 60);
    setTimeout(() => {
      clearInterval(interval);
      oscillator.stop();
    }, 2000);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'F1') {
      event.preventDefault();
      this.procesosCedisService.setPerfil('2');
      this.router.navigate(['/menu']);
    }

    if (event.key === 'F2') {
      event.preventDefault();
      if (this.orden) {
        this.router.navigate(['/primer-faltantes', this.orden]);
      } else {
        console.warn('orden no está definido');
      }

      this.focusInput();
    }
  }
}
