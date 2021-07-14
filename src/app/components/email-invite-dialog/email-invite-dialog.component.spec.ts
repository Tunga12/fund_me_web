import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInviteDialogComponent } from './email-invite-dialog.component';

describe('EmailInviteDialogComponent', () => {
  let component: EmailInviteDialogComponent;
  let fixture: ComponentFixture<EmailInviteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailInviteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailInviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
