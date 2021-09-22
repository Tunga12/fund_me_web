import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReasonsComponent } from './report-reasons.component';

describe('ReportReasonsComponent', () => {
  let component: ReportReasonsComponent;
  let fixture: ComponentFixture<ReportReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportReasonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
