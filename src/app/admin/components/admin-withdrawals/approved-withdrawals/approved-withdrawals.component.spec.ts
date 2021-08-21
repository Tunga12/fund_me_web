import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedWithdrawalsComponent } from './approved-withdrawals.component';

describe('ApprovedWithdrawalsComponent', () => {
  let component: ApprovedWithdrawalsComponent;
  let fixture: ComponentFixture<ApprovedWithdrawalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedWithdrawalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedWithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
