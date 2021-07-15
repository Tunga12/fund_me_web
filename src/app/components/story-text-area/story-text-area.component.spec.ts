import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTextAreaComponent } from './story-text-area.component';

describe('StoryTextAreaComponent', () => {
  let component: StoryTextAreaComponent;
  let fixture: ComponentFixture<StoryTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryTextAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
