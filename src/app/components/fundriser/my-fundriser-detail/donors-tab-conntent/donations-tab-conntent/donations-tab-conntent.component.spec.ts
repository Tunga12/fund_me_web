import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsTabConntentComponent } from './donations-tab-conntent.component';

describe('DonationsTabConntentComponent', () => {
  let component: DonationsTabConntentComponent;
  let fixture: ComponentFixture<DonationsTabConntentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationsTabConntentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationsTabConntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
