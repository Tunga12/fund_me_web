import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsTabContentComponent as DonationsTabContentComponent } from './donations-tab-content.component';

describe('DonationsTabContentComponent', () => {
  let component: DonationsTabContentComponent;
  let fixture: ComponentFixture<DonationsTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationsTabContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationsTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
