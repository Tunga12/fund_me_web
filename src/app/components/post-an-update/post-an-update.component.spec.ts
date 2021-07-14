import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAnUpdateComponent } from './post-an-update.component';

describe('PostAnUpdateComponent', () => {
  let component: PostAnUpdateComponent;
  let fixture: ComponentFixture<PostAnUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAnUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAnUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
