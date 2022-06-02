import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetShortcodeComponent } from './set-shortcode.component';

describe('SetShortcodeComponent', () => {
  let component: SetShortcodeComponent;
  let fixture: ComponentFixture<SetShortcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetShortcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetShortcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
