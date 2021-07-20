import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FudriserDetailPublicComponent } from './fudriser-detail-public.component';

describe('FudriserDetailPublicComponent', () => {
  let component: FudriserDetailPublicComponent;
  let fixture: ComponentFixture<FudriserDetailPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FudriserDetailPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FudriserDetailPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
