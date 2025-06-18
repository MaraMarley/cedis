import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerEmbarqueComponent } from './primer-embarque.component';

describe('PrimerEmbarqueComponent', () => {
  let component: PrimerEmbarqueComponent;
  let fixture: ComponentFixture<PrimerEmbarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimerEmbarqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimerEmbarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
