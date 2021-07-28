import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFundraiserGoalComponent } from './set-fundraiser-goal.component';

describe('SetFundraiserGoalComponent', () => {
  let component: SetFundraiserGoalComponent;
  let fixture: ComponentFixture<SetFundraiserGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetFundraiserGoalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetFundraiserGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
