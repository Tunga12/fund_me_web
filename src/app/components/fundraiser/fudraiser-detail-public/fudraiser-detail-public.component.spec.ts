import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FudraiserDetailPublicComponent } from './fudraiser-detail-public.component';

describe('FudraiserDetailPublicComponent', () => {
  let component: FudraiserDetailPublicComponent;
  let fixture: ComponentFixture<FudraiserDetailPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FudraiserDetailPublicComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FudraiserDetailPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
