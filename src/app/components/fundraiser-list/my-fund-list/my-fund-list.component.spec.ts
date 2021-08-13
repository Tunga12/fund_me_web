import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFundListComponent } from './my-fund-list.component';

describe('MyFundListComponent', () => {
  let component: MyFundListComponent;
  let fixture: ComponentFixture<MyFundListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFundListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
