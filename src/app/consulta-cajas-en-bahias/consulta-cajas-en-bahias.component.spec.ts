import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCajasEnBahiasComponent } from './consulta-cajas-en-bahias.component';

describe('ConsultaCajasEnBahiasComponent', () => {
  let component: ConsultaCajasEnBahiasComponent;
  let fixture: ComponentFixture<ConsultaCajasEnBahiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaCajasEnBahiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaCajasEnBahiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
