import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerAndBeneficiarySectionComponent } from './organizer-and-beneficiary-section.component';

describe('OrganizerAndBeneficiarySectionComponent', () => {
  let component: OrganizerAndBeneficiarySectionComponent;
  let fixture: ComponentFixture<OrganizerAndBeneficiarySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerAndBeneficiarySectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerAndBeneficiarySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
