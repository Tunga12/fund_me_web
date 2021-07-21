import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFundriserMediaComponent } from './set-fundriser-media.component';

describe('SetFundriserMediaComponent', () => {
  let component: SetFundriserMediaComponent;
  let fixture: ComponentFixture<SetFundriserMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetFundriserMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetFundriserMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
