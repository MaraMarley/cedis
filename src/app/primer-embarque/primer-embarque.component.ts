import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcesosCedisService } from '../service/procesos-cedis.service';
import { Iembarqes } from '../interfaces/iembarqes';

@Component({
  selector: 'app-primer-embarque',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './primer-embarque.component.html',
  styleUrls: ['./primer-embarque.component.css']
})

export class PrimerEmbarqueComponent {  
  embarque: Iembarqes;
  form: FormGroup;
  titulo: string = 'EMBARQUE';
  subtitulo: string = "Primer conteo";
  folio: any;
  mensaje: string = '';
  validacion = false;
  isFolioReadonly = false;
  show = false;
  dataScaner: any;
  F3folio:any;
  F3mensajeerror:any;
  F3totales: any;
  F3escaneadas:any;
  F3tienda: any;
  F3EtiquetaCaja: any;
  // Declaración de ViewChild para obtener la referencia del input
  @ViewChild('EscanearcajaInput') escanearcajaInput!: ElementRef;

  constructor(private router: Router, private service: ProcesosCedisService) {        
    this.form = new FormGroup({
      folio: new FormControl('', [Validators.required]),
      tienda: new FormControl(''),
      caja: new FormControl(''),
      cajas: new FormControl(''),
      Escanearcaja: new FormControl(''),
      F3: new FormControl('F3'),
      F5: new FormControl('F5'),
      F6: new FormControl('F6'),
    });

    this.embarque = {
      proceso : 0,
      folio_embarque: '',
      id_tienda: '',
      etiqueta_caja:''
    };
  }

  onSubmit() {    
    this.folio = this.form.get("folio")?.value;
    if (this.form.valid) {      
    } else {
      console.log('Formulario no válido');
    }
  }

  onEnterPress(event: KeyboardEvent): void {   
    if(event.key === 'Enter' && this.form.get("folio")?.value == '' ){
      return;
    }     
    if (event.key === 'Enter') {
      
      const escaneado = this.form.get('Escanearcaja')?.value;
      this.getPrimerConteoFolio(); 
    }
  }

  getPrimerConteoFolio() {
    const folio = this.form.get('folio')?.value;
    const body = {
      proceso : 0,
      folio_embarque : folio
    } 
    this.service.getPrimerConteoFolio(body).subscribe(resp => {
      if (resp[0].error_id == 0) {                 
        this.show = true;      
        
        // this.F3folio = resp[0].folio;
        this.F3mensajeerror= resp[0].msg_error;
        this.F3totales = resp[0].totales;
        this.F3escaneadas= resp[0].escaneadas;
        this.F3tienda= resp[0].tienda;
        // this.form.get('tienda')?.setValue(this.F3tienda);
        // this.form.get('caja')?.setValue(this.F3escaneadas);
        // this.form.get('cajas')?.setValue(this.F3totales);
        // this.form.get('Escanearcaja')?.setValue('');
        this.mensaje = ''   
        this.isFolioReadonly = true;     
        if (this.escanearcajaInput) {
          this.escanearcajaInput.nativeElement.focus();
        }        
      } else {         
        this.folio = false;                        
        this.mensaje = resp[0]?.msg_error;
        this.playBeep();
      }      
    });
  }

  onEnterPressScanner(event: KeyboardEvent): void {
    if(event.key === 'Enter' && this.form.get("folio")?.value == '' ){
      return;
    }     
    if (event.key === 'Enter') {
      // const escaneado = this.form.get('Escanearcaja')?.value;            
      this.getPrimerConteoScaner(); 
    }
  }
  getPrimerConteoScaner() {
    const folio = this.form.get('folio')?.value;
    // const etiqueta_caja = '033275000662114100000001'
    const etiqueta_caja = this.form.get('Escanearcaja')?.value;
    this.form.get('Escanearcaja')?.setValue(etiqueta_caja);
    const body = {
      proceso : 1,
      folio_embarque : folio,
      id_tienda : this.F3tienda,
      etiqueta_caja : this.form.get('Escanearcaja')?.value
    }
    this.service.getPrimerConteoScaner(body).subscribe(resp => {
      if (resp[0].error_id == 0) { 
        this.F3folio = resp[0].folio;
        this.F3mensajeerror= resp[0].msg_error;
        this.F3totales = resp[0].totales;
        this.F3escaneadas= resp[0].escaneadas;
        this.F3tienda=resp[0].tienda;
        // this.form.get('tienda')?.setValue(resp[0].tienda);
        // this.form.get('caja')?.setValue(resp[0].escaneadas);
        // this.form.get('cajas')?.setValue(resp[0].totales);
        this.form.get('Escanearcaja')?.setValue('');
        this.mensaje = ''   
        this.isFolioReadonly = true;     
        if (this.escanearcajaInput) {
          this.escanearcajaInput.nativeElement.focus();
        }        
      } else {
        // this.folio = false;   
        this.dataScaner= this.form.get('Escanearcaja')!.value
        this.form.get('Escanearcaja')!.reset();        
        this.F3mensajeerror = resp[0]?.msg_error;
        this.playBeep();
      }      
    });
  }


  onFPressScanner(event: KeyboardEvent): void {
    console.log("Tecla presionada:", event.key); // Imprime la tecla presionada
  }
  
  fs(element: any){        
    if(element.innerText == 'F3'|| element == 'F3') {  
      const body = {
        proceso : 2,
        folio_embarque : this.folio,
        id_tienda : this.F3tienda
      }
      this.service.getPrimerConteoScaner(body).subscribe(resp => {        
        if(resp[0].error_id == 0){
          this.F3folio = resp[0].folio;
          this.F3mensajeerror= resp[0].msg_error;
          this.F3totales = resp[0].totales;
          this.F3escaneadas= resp[0].escaneadas;
          this.F3tienda=resp[0].tienda;
        }
        else {
          this.F3mensajeerror = resp[0].msg_error;
          this.playBeep();
        }
        
      })

    }  else if (element.innerText == 'F6'|| element == 'F6') {
      const body = {
        proceso : 3,
        folio_embarque : this.folio,
        id_tienda : this.F3tienda,
        etiqueta_caja : this.dataScaner
      }
      this.service.getPrimerConteoScaner(body).subscribe(resp => {
        if(resp[0].error_id == 0){
          this.F3folio = resp[0].folio;
          this.F3mensajeerror= resp[0].msg_error;
          this.F3totales = resp[0].totales;
          this.F3escaneadas= resp[0].escaneadas;
        }
        else {
          this.F3mensajeerror = resp[0].msg_error;
          this.playBeep();
        }
        
      })
      
    }
    else if(element.innerText == 'F5'|| element == 'F5') {
      const body = {
        proceso : 4,
        folio_embarque : this.folio,
        id_tienda : this.F3tienda,
        // etiqueta_caja : this.form.get('Escanearcaja')?.value
        etiqueta_caja : this.dataScaner
      }
      this.service.getPrimerConteoScaner(body).subscribe(resp => {                
        if(resp[0].error_id == 0){
          this.F3folio = resp[0].folio;
          this.F3mensajeerror= resp[0].msg_error;
          this.F3totales = resp[0].totales;
          this.F3escaneadas= resp[0].escaneadas;
        }
        else {
          this.F3mensajeerror = resp[0].msg_error;
          this.playBeep();
        }
        
      })
    }      
  }

  
  playBeep(): void {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine'; // Tipo de onda
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    gainNode.gain.setValueAtTime(2, audioContext.currentTime);

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
      event.preventDefault(); event.preventDefault();const perfil = '3';
      this.service.setPerfil(perfil);    
      this.router.navigate(['/menu']);
    } 
    if (event.key === 'F3' || event.key === 'F5' || event.key === 'F6'){
      event.preventDefault();
      this.fs(event.key);
    }
  }
  resetFolioReadonly() {
    this.isFolioReadonly = false;
  }
}
