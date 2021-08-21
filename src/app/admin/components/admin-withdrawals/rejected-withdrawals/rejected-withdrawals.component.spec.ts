import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedWithdrawalsComponent } from './rejected-withdrawals.component';

describe('RejectedWithdrawalsComponent', () => {
  let component: RejectedWithdrawalsComponent;
  let fixture: ComponentFixture<RejectedWithdrawalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedWithdrawalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedWithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
