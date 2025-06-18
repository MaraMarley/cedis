import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerFaltantesComponent } from './primer-faltantes.component';

describe('PrimerFaltantesComponent', () => {
  let component: PrimerFaltantesComponent;
  let fixture: ComponentFixture<PrimerFaltantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimerFaltantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimerFaltantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
