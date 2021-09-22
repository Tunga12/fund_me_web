import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulPaymentsComponent } from './successful-payments.component';

describe('SuccessfulPaymentsComponent', () => {
  let component: SuccessfulPaymentsComponent;
  let fixture: ComponentFixture<SuccessfulPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
