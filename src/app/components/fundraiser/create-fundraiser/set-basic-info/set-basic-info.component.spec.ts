import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetBasicInfoComponent } from './set-basic-info.component';

describe('SetBasicInfoComponent', () => {
  let component: SetBasicInfoComponent;
  let fixture: ComponentFixture<SetBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
