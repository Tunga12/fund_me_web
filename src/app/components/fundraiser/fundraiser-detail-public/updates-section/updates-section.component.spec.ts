import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesSectionComponent } from './updates-section.component';

describe('UpdatesSectionComponent', () => {
  let component: UpdatesSectionComponent;
  let fixture: ComponentFixture<UpdatesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
