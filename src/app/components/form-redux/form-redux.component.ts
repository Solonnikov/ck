import { Component, OnInit } from '@angular/core';

// Redux imports
import { NgRedux } from '@angular-redux/store';
import { AccountOptions } from '../../store';
import { GET, UPDATE } from '../../actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-form-redux',
  templateUrl: './form-redux.component.html',
  styleUrls: ['./form-redux.component.css']
})
export class FormReduxComponent implements OnInit {
  @select() allowUnverifiedLogin: Observable<AccountOptions>;
  @select() defaultLanguage: Observable<AccountOptions>;
  @select() loginIdentifierConflict: Observable<AccountOptions>;
  @select() loginIdentifiers: Observable<AccountOptions>;
  @select() preventLoginIDHarvesting: Observable<AccountOptions>;
  @select() sendAccountDeletedEmail: Observable<AccountOptions>;
  @select() sendWelcomeEmail: Observable<AccountOptions>;
  @select() verifyEmail: Observable<AccountOptions>;
  @select() verifyProviderEmail: Observable<AccountOptions>;

  constructor(
    private ngRedux: NgRedux<AccountOptions>
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.ngRedux.dispatch({ type: GET });
  }
}
