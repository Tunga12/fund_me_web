import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingWithdrawalsComponent } from './pending-withdrawals.component';

describe('PendingWithdrawalsComponent', () => {
  let component: PendingWithdrawalsComponent;
  let fixture: ComponentFixture<PendingWithdrawalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingWithdrawalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingWithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
