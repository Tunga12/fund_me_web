import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorsTabContentComponent } from './donors-tab-content.component';

describe('DonorsTabContentComponent', () => {
  let component: DonorsTabContentComponent;
  let fixture: ComponentFixture<DonorsTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorsTabContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorsTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
