import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedContactsTabContentComponent } from './invited-contacts-tab-content.component';

describe('InvitedContactsTabContentComponent', () => {
  let component: InvitedContactsTabContentComponent;
  let fixture: ComponentFixture<InvitedContactsTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitedContactsTabContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedContactsTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
