import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundoFaltantesComponent } from './segundo-faltantes.component';

describe('SegundoFaltantesComponent', () => {
  let component: SegundoFaltantesComponent;
  let fixture: ComponentFixture<SegundoFaltantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegundoFaltantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegundoFaltantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
