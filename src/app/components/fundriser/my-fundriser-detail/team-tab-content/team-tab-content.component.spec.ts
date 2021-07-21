import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTabContentComponent } from './team-tab-content.component';

describe('TeamTabContentComponent', () => {
  let component: TeamTabContentComponent;
  let fixture: ComponentFixture<TeamTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamTabContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
