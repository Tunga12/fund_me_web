import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoantionsComponent } from './doantions.component';

describe('DoantionsComponent', () => {
  let component: DoantionsComponent;
  let fixture: ComponentFixture<DoantionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoantionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoantionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
