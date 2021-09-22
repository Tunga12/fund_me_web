import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuccessfulPaymentsComponent } from './unsuccessful-payments.component';

describe('UnsuccessfulPaymentsComponent', () => {
  let component: UnsuccessfulPaymentsComponent;
  let fixture: ComponentFixture<UnsuccessfulPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuccessfulPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuccessfulPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
