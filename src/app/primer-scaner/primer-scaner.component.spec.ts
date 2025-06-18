import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerScanerComponent } from './primer-scaner.component';

describe('PrimerScanerComponent', () => {
  let component: PrimerScanerComponent;
  let fixture: ComponentFixture<PrimerScanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimerScanerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimerScanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
