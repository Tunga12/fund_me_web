import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateImageCropperComponent } from './update-image-cropper.component';

describe('UpdateImageCropperComponent', () => {
  let component: UpdateImageCropperComponent;
  let fixture: ComponentFixture<UpdateImageCropperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateImageCropperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateImageCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
