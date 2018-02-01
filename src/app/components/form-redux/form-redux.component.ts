import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Redux imports
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { AccountOptions } from '../../models/AccountOptions';
import { GET, FORM_CHANGED } from '../../actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-form-redux',
  templateUrl: './form-redux.component.html',
  styleUrls: ['./form-redux.component.css']
})
export class FormReduxComponent implements OnInit, OnChanges {
  editDataForm: Observable<AccountOptions>;

  accountOptions: AccountOptions;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    public router: Router
  ) {
    this.editDataForm = ngRedux.select('editDataForm');
  }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  onEditSubmit() {
    this.ngRedux.dispatch({
      type: FORM_CHANGED, payload: {
        value: this.editDataForm
      }
    });
    this.router.navigate(['/readonly']);
  }
}