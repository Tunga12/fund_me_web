import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFundraiserMediaComponent } from './set-fundraiser-media.component';

describe('SetFundraiserMediaComponent', () => {
  let component: SetFundraiserMediaComponent;
  let fixture: ComponentFixture<SetFundraiserMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetFundraiserMediaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetFundraiserMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
