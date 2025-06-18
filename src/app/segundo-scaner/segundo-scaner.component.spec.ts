import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundoScanerComponent } from './segundo-scaner.component';

describe('SegundoScanerComponent', () => {
  let component: SegundoScanerComponent;
  let fixture: ComponentFixture<SegundoScanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegundoScanerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegundoScanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
