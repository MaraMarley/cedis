import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestosComponent } from './manifestos.component';

describe('ManifestosComponent', () => {
  let component: ManifestosComponent;
  let fixture: ComponentFixture<ManifestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifestosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManifestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
