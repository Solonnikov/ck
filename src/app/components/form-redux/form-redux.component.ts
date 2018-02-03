import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Redux imports
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { AccountOptions } from '../../models/AccountOptions';
import { GET, GET_SUCCESS, UPDATE_SUCCESS } from '../../actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

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
    this.ngRedux.dispatch({
      type: GET
    });
  }
}