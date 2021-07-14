import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotoVideoDialogComponent } from './add-photo-video-dialog.component';

describe('AddPhotoVideoDialogComponent', () => {
  let component: AddPhotoVideoDialogComponent;
  let fixture: ComponentFixture<AddPhotoVideoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhotoVideoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhotoVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
