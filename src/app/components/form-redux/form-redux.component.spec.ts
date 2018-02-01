import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReduxComponent } from './form-redux.component';

describe('FormReduxComponent', () => {
  let component: FormReduxComponent;
  let fixture: ComponentFixture<FormReduxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormReduxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReduxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
