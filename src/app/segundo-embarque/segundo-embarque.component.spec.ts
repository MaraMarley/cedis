import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundoEmbarqueComponent } from './segundo-embarque.component';

describe('SegundoEmbarqueComponent', () => {
  let component: SegundoEmbarqueComponent;
  let fixture: ComponentFixture<SegundoEmbarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegundoEmbarqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegundoEmbarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
