import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamMembersDialogComponent } from './add-team-members-dialog.component';

describe('AddTeamMembersDialogComponent', () => {
  let component: AddTeamMembersDialogComponent;
  let fixture: ComponentFixture<AddTeamMembersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeamMembersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
