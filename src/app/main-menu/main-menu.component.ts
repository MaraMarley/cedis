import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProcesosCedisService } from '../service/procesos-cedis.service';

@Component({
  selector: 'app-main-menu',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
  selected = 'option2';
  form: FormGroup;

  constructor(private router: Router, private service: ProcesosCedisService) {
    this.form = new FormGroup({
      perfil: new FormControl(''),
    });
  }
  onSubmit() {
    if(this.form.get('perfil')!.value != '')
    {     
      const perfil = this.form.get('perfil')?.value;
      this.service.setPerfil(perfil);
      this.router.navigate(['/menu']);
    }
  }

   @HostListener('document:keydown', ['$event'])
      handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'F1') {
          event.preventDefault();         
        }              
      }
}


