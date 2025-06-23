import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCajaBahiaComponent } from './buscar-caja-bahia.component';

describe('BuscarCajaBahiaComponent', () => {
  let component: BuscarCajaBahiaComponent;
  let fixture: ComponentFixture<BuscarCajaBahiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarCajaBahiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarCajaBahiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
