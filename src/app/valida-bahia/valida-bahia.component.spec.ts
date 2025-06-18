import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaBahiaComponent } from './valida-bahia.component';

describe('ValidaBahiaComponent', () => {
  let component: ValidaBahiaComponent;
  let fixture: ComponentFixture<ValidaBahiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidaBahiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidaBahiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
