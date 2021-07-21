import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyFundriserDetailComponent } from './my-funriser-detail.component';

describe('MyFundriserDetailComponent', () => {
  let component: MyFundriserDetailComponent;
  let fixture: ComponentFixture<MyFundriserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFundriserDetailComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFundriserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
