import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDoantionsComponent } from './top-doantions.component';

describe('TopDoantionsComponent', () => {
  let component: TopDoantionsComponent;
  let fixture: ComponentFixture<TopDoantionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopDoantionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDoantionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
