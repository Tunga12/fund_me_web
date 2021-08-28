import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorsTabConntentComponent } from './donors-tab-content.component';

describe('DonorsTabConntentComponent', () => {
  let component: DonorsTabConntentComponent;
  let fixture: ComponentFixture<DonorsTabConntentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorsTabConntentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorsTabConntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
