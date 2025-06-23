import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaGeneralBahiaComponent } from './busqueda-general-bahia.component';

describe('BusquedaGeneralBahiaComponent', () => {
  let component: BusquedaGeneralBahiaComponent;
  let fixture: ComponentFixture<BusquedaGeneralBahiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaGeneralBahiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaGeneralBahiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
