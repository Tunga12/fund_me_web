import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundriserListComponent } from './fundriser-list.component';

describe('FundriserListComponent', () => {
  let component: FundriserListComponent;
  let fixture: ComponentFixture<FundriserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundriserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundriserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
