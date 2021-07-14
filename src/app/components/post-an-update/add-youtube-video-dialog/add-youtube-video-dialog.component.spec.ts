import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYoutubeVideoDialogComponent } from './add-youtube-video-dialog.component';

describe('AddYoutubeVideoDialogComponent', () => {
  let component: AddYoutubeVideoDialogComponent;
  let fixture: ComponentFixture<AddYoutubeVideoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddYoutubeVideoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYoutubeVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
