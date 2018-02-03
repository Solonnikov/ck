import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Redux imports
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { AccountOptions } from '../../models/AccountOptions';
import { GET, GET_SUCCESS, FORM_CHANGED } from '../../actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { createEpicMiddleware } from 'redux-observable';
import { TypeModifier } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-redux',
  templateUrl: './redux-update.component.html',
  styleUrls: ['./redux-update.component.css']
})
export class ReduxUpdateComponent implements OnInit {
  editDataForm: Observable<AccountOptions>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    public router: Router
  ) {
    this.editDataForm = ngRedux.select('editDataForm');
  }

  ngOnInit() {
    this.ngRedux.dispatch({
      type: GET
    });
  }

  onEditSubmit() {
    this.ngRedux.dispatch({
      type: FORM_CHANGED,
      payload: {
        defaultLanguage: 'ua'
      }
    });
    // this.router.navigate(['/redux-readonly']);
  };
}