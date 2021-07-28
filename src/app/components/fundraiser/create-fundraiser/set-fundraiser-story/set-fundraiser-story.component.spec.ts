import { ComponentFixture, TestBed } from '@angular/core/testing';

import SetFundraiserStoryComponent from './set-fundraiser-story.component';

describe('SetFundraiserStoryComponent', () => {
  let component: SetFundraiserStoryComponent;
  let fixture: ComponentFixture<SetFundraiserStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetFundraiserStoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetFundraiserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
