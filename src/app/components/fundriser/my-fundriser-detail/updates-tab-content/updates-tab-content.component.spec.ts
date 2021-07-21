import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesTabContentComponent } from './updates-tab-content.component';

describe('UpdatesTabContentComponent', () => {
  let component: UpdatesTabContentComponent;
  let fixture: ComponentFixture<UpdatesTabContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesTabContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
