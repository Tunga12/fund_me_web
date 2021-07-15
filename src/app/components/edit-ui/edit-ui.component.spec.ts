import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUiComponent } from './edit-ui.component';

describe('EditUiComponent', () => {
  let component: EditUiComponent;
  let fixture: ComponentFixture<EditUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
