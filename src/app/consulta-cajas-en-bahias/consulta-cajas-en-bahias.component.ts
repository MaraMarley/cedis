import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProcesosCedisService } from '../service/procesos-cedis.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta-cajas-en-bahias',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './consulta-cajas-en-bahias.component.html',
  styleUrl: './consulta-cajas-en-bahias.component.css'
})
export class ConsultaCajasEnBahiasComponent implements OnInit, AfterViewInit{

   constructor(private router: Router,
    private service: ProcesosCedisService,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        orden: [''],
        tienda: ['']
      });
      
  }


   data2: any[] = [
      {Etiqueta: '030005000660891', bahia: 5 },
      {Etiqueta: '030005000662157100000001', bahia: 7 },
      {Etiqueta: '030005000661883600000001', bahia: 5 }
    ]

@ViewChild('ordenInput') ordenInput!: ElementRef;
  @ViewChild('tiendaInput') tiendaInput!: ElementRef;

  form: FormGroup;
  title: string = 'Consulta cajas.';
  orden: string = 'Orden';
  tienda: string = 'Tienda';
  optSalir: string = "Salir";
  optSiguiente: string = "Siguiente";
  optAnterior: string = "Anterior";
  etiqueta: string = 'Etiqueta';
  bahia: string = 'Bahía';
  resultTable = false;

  ngOnInit(): void {
   
    this.form = this.fb.group({
      orden: ['', Validators.required],
      tienda: ['', Validators.required]
    });
  }

   ngAfterViewInit(): void {    
    this.ordenInput.nativeElement.focus();
  }

  enfocarTienda(): void {
    if (this.form.get('orden')?.valid) {
      this.tiendaInput.nativeElement.focus();
    }
  }

  verificarYEnviar(): void {        
    if (this.form.get('tienda')?.valid) {
      this.onSubmit();      
    }
  }
  
 onSubmit(): void {   
  this.resultTable = true;
//  const body ={
//   orden: this.form.get('orden')?.value,
//   tienda: this.form.get('tienda')?.value
//   }
//   console.log('Consumire el servicio ');    
//   this.service.getConsultaCaja(body).subscribe(data => {
//     if(data != '' || data != null){      
//       console.log('Los datos son: ', data);
//        this.resultTable = true;
//     }else {
//       alert('No hay datos para mostrar');
//     }
//   });    
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault();      
      const perfil = '4';
      this.service.setPerfil(perfil);
      this.router.navigate(['/menu']);
    }
  }
}
