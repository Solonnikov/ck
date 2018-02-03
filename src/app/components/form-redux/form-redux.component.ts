import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Redux imports
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { AccountOptions } from '../../models/AccountOptions';
import { GET, FORM_CHANGED } from '../../actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { createEpicMiddleware } from 'redux-observable';

@Component({
  selector: 'app-form-redux',
  templateUrl: './form-redux.component.html',
  styleUrls: ['./form-redux.component.css']
})
export class FormReduxComponent implements OnInit {
  editDataForm: Observable<AccountOptions>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    public router: Router
  ) {
    this.editDataForm = ngRedux.select('editDataForm');
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.ngRedux.dispatch({
      type: GET
    });
  }

  // onEditSubmit() {
  //   this.ngRedux.dispatch({
  //     type: FORM_CHANGED,
  //     payload: {
  //       defaultLanguage: 'ua',
  //       loginIdentifiers: 'username'
  //     }
  //   });
  // };
}