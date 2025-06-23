import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenBahiaComponent } from './resumen-bahia.component';

describe('ResumenBahiaComponent', () => {
  let component: ResumenBahiaComponent;
  let fixture: ComponentFixture<ResumenBahiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenBahiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenBahiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
