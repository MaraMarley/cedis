import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProcesosCedisService } from '../service/procesos-cedis.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-buscar-caja-bahia',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './buscar-caja-bahia.component.html',
  styleUrl: './buscar-caja-bahia.component.css'
})
export class BuscarCajaBahiaComponent implements OnInit, AfterViewInit{

  constructor(private router: Router,
    private service: ProcesosCedisService,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        orden: [''],
        tienda: ['']
      });
      
  }

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
 const body ={
  orden: this.form.get('orden')?.value,
  tienda: this.form.get('tienda')?.value
  }
  console.log('Consumire el servicio ');    
  this.service.getConsultaCaja(body).subscribe(data => {
    if(data != '' || data != null){      
      console.log('Los datos son: ', data);
       this.resultTable = true;
    }else {
      alert('No hay datos para mostrar');
    }
  });    
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
