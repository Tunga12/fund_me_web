import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneInviteDialogComponent } from './phone-invite-dialog.component';

describe('PhoneInviteDialogComponent', () => {
  let component: PhoneInviteDialogComponent;
  let fixture: ComponentFixture<PhoneInviteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneInviteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneInviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
