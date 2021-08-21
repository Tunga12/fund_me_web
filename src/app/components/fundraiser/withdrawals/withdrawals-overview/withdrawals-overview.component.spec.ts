import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalsOverviewComponent } from './withdrawals-overview.component';

describe('WithdrawalsOverviewComponent', () => {
  let component: WithdrawalsOverviewComponent;
  let fixture: ComponentFixture<WithdrawalsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
