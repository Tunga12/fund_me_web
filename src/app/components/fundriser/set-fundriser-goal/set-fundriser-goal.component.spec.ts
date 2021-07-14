import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFundriserGoalComponent } from './set-fundriser-goal.component';

describe('SetFundriserGoalComponent', () => {
  let component: SetFundriserGoalComponent;
  let fixture: ComponentFixture<SetFundriserGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetFundriserGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetFundriserGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
