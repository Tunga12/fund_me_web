import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundraiserDetailPublicComponent } from './fundraiser-detail-public.component';

describe('FudraiserDetailPublicComponent', () => {
  let component: FundraiserDetailPublicComponent;
  let fixture: ComponentFixture<FundraiserDetailPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FundraiserDetailPublicComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundraiserDetailPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
