import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyFundraiserDetailComponent } from './my-fundraiser-detail.component';

describe('MyFundraiserDetailComponent', () => {
  let component: MyFundraiserDetailComponent;
  let fixture: ComponentFixture<MyFundraiserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyFundraiserDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFundraiserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
