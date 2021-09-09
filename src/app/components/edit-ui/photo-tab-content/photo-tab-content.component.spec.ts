import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoTabContentComponent } from './photo-tab-content.component';

describe('PhotoTabContentComponent', () => {
  let component: PhotoTabContentComponent;
  let fixture: ComponentFixture<PhotoTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoTabContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
