import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFundriserComponent } from './create-fundriser.component';

describe('CreateFundriserComponent', () => {
  let component: CreateFundriserComponent;
  let fixture: ComponentFixture<CreateFundriserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFundriserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFundriserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
