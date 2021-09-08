import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAndOrganizerSectionComponent } from './team-and-organizer-section.component';

describe('TeamAndOrganizerSectionComponent', () => {
  let component: TeamAndOrganizerSectionComponent;
  let fixture: ComponentFixture<TeamAndOrganizerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAndOrganizerSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAndOrganizerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
