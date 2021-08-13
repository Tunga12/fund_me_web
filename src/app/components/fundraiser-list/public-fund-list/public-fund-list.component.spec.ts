import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFundListComponent } from './public-fund-list.component';

describe('PublicFundListComponent', () => {
  let component: PublicFundListComponent;
  let fixture: ComponentFixture<PublicFundListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicFundListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicFundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
