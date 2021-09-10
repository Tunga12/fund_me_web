import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedFundraisersComponent } from './reported-fundraisers.component';

describe('ReportedFundraisersComponent', () => {
  let component: ReportedFundraisersComponent;
  let fixture: ComponentFixture<ReportedFundraisersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportedFundraisersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedFundraisersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
