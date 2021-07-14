import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFundriserStoryComponent } from './set-fundriser-story.component';

describe('SetFundriserStoryComponent', () => {
  let component: SetFundriserStoryComponent;
  let fixture: ComponentFixture<SetFundriserStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetFundriserStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetFundriserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
