import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFundraisersComponent } from './my-fundraisers.component';

describe('MyFundraisersComponent', () => {
  let component: MyFundraisersComponent;
  let fixture: ComponentFixture<MyFundraisersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFundraisersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFundraisersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
