import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalsHistoryComponent } from './withdrawals-history.component';

describe('WithdrawalsHistoryComponent', () => {
  let component: WithdrawalsHistoryComponent;
  let fixture: ComponentFixture<WithdrawalsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
