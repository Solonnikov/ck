import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxUpdateComponent } from './redux-update.component';

describe('ReduxUpdateComponent', () => {
  let component: ReduxUpdateComponent;
  let fixture: ComponentFixture<ReduxUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReduxUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
