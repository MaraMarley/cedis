  import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
  import { Router } from '@angular/router';
  import { ProcesosCedisService } from '../service/procesos-cedis.service';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { Ibahia } from '../interfaces/ibahia';

  @Component({
    selector: 'app-valida-bahia',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './valida-bahia.component.html',
    styleUrl: './valida-bahia.component.css'
  })
  export class
    ValidaBahiaComponent {
    form: FormGroup;
    ibahia: Ibahia = { proceso: 0, bahia: '' };
    titulo: string = 'Verificación Bahía Caja';
    ubicacion: string = 'BAHÍA';
    caja: string = 'CAJA';
    msgOk: string = 'Mensaje OK';
    msgErr: string = 'Mensaje Error: ';
    optionotraCaja: string = 'F2: Bahía';
    regresar: string = 'F1: Regresar';
    Siete: string = '7: Activar';
    isFolioReadonly = false;
    mesajeErr: any;
    mensajeOk: any;
    show7: boolean = false;
    @ViewChild('cajaInput') cajaInput!: ElementRef;
    @ViewChild('otraCaja') otraCaja!: ElementRef;
    @ViewChild('ubicacionInput') ubicacionInput!: ElementRef;

    constructor(private router: Router, private service: ProcesosCedisService, private fb: FormBuilder) {
      this.form = this.fb.group({
        ubicacion: ['', Validators.required],
        caja: ['', Validators.required]
      });
      this.form.get('caja')?.disable();
    }

    ngAfterViewInit() {
      this.ubicacionInput.nativeElement.focus();
    }

    onEnterPress(event: KeyboardEvent): void {
      if (event.key === 'Enter' && this.form.get("ubicacion")?.value == '') {
        return;
      }
      if (event.key === 'Enter') {
        this.getUbicacion();
      }
    }

    onEnterPressCaja(event: KeyboardEvent): void {
      if (event.key === 'Enter' && this.form.get("caja")?.value == '' || this.form.get("caja")?.value == null) {
        this.ubicacionInput.nativeElement.focus();
        this.msgErr = '';
        return;
      }
      if (event.key === 'Enter') {
        this.getCaja();
      }
    }

    getCaja() {
      const ubicacion = this.form.get('ubicacion')?.value;
      const caja = this.form.get('caja')?.value;
      this.ibahia = {
        proceso: 2,
        bahia: ubicacion,
        etiqueta_caja: caja
      }
      this.service.getBahia(this.ibahia).subscribe(resp => {
        const myResp = resp;
        if (myResp[0].id_error != 0) {
          this.show7 = true;
          this.mesajeErr = 'Error en caja' + ' :  ' + caja
          this.form.get('ubicacion')?.disable();
          this.form.get('caja')?.disable();
          this.mensajeOk = '';
          this.playIntermittentBuzzer();
          // this.otraCaja.nativeElement.focus();
        }
        else {          
          this.form.get('ubicacion')?.disable();
          this.mensajeOk = 'Caja' + '  :  ' + caja;
          this.mesajeErr = '';
          this.form.get('caja')?.reset();
        }
      });
    }

    clickOtraCaja() {
      if (this.form.get('ubicacion')?.value == '' || this.form.get('ubicacion')?.value == null) {
        this.ngAfterViewInit();
      }
      else if (this.form.get('caja')!.value == '') {
        this.cajaInput.nativeElement.focus();
      }
      else {
        this.form.get('caja')?.reset();
        this.form.get('caja')?.disable();
        this.form.get('ubicacion')?.enable();
        this.form.get('ubicacion')?.reset();
        this.ubicacionInput.nativeElement.focus();
        this.mesajeErr = '';
      }
    }

    irAOtraPagina() {
      this.router.navigate(['']);
    }

    clickF2() {
      this.form.get('ubiacion')?.setValue(" ")
      this.form.get('ubicacion')?.enable();
      this.ubicacionInput.nativeElement.focus();
      this.form.get('caja')?.disable();
    }

    click7() {
      this.show7 = false;
      this.form.get('caja')?.setValue(" ")
      this.form.get('caja')?.enable();
      this.cajaInput.nativeElement.focus();
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


    getUbicacion() {
      const ubicacion = this.form.get('ubicacion')?.value;
      this.ibahia = {
        proceso: 1,
        bahia: ubicacion,
        etiqueta_caja: ''
      }
      this.service.getBahia(this.ibahia).subscribe(resp => {
        const respService = resp;
        if (respService[0].id_error != 0) {
          this.mesajeErr = 'Hubo un ERROR' + ' :  ' + ubicacion
          this.form.get('ubicacion')?.reset();
          this.ubicacionInput.nativeElement.focus();
          this.playIntermittentBuzzer();
        }
        else {
          this.mesajeErr = '';
          this.form.get('ubicacion')?.disable();
          this.form.get('caja')?.enable();
          this.mensajeOk = 'Bahia:  ' + ' ' + this.form.get('ubicacion')!.value
          this.cajaInput.nativeElement.focus();
        }
      });
    }

    onKeyUpEvent(event: KeyboardEvent) {
      if (event.key === '7') {        
        this.form.get('caja')?.enable();        
        this.cajaInput.nativeElement.focus();
      }
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (event.key === 'F1') {
        event.preventDefault();
        event.preventDefault(); event.preventDefault(); const perfil = '4';
        this.service.setPerfil(perfil);
        this.router.navigate(['/menu']);
      }
      if (event.key === 'F2') {
        this.form.reset();
        this.form.get('ubicacion')?.enable();
        this.form.get('caja')?.disable();
        this.ubicacionInput.nativeElement.focus();
      }
      if (this.show7 && event.key === '7') {
        event.preventDefault();
        this.show7 = false;
        this.form.get('caja')?.enable();
        this.form.get('caja')?.setValue("")
        this.cajaInput.nativeElement.focus();
      }
    }
  }
