import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

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

  accountOptions = {
    allowUnverifiedLogin: null,
    defaultLanguage: null,
    loginIdentifierConflict: null,
    loginIdentifiers: null,
    preventLoginIDHarvesting: null,
    sendAccountDeletedEmail: null,
    sendWelcomeEmail: null,
    verifyEmail: null,
    verifyProviderEmail: null
  }

  constructor(
    private ngRedux: NgRedux<IAppState>,
    public router: Router,
    public flashMessagesService: FlashMessagesService
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
        allowUnverifiedLogin: this.accountOptions.allowUnverifiedLogin,
        defaultLanguage: this.accountOptions.defaultLanguage,
        loginIdentifierConflict: this.accountOptions.loginIdentifierConflict,
        loginIdentifiers: this.accountOptions.loginIdentifiers,
        preventLoginIDHarvesting: this.accountOptions.preventLoginIDHarvesting,
        sendAccountDeletedEmail: this.accountOptions.sendAccountDeletedEmail,
        sendWelcomeEmail: this.accountOptions.sendWelcomeEmail,
        verifyEmail: this.accountOptions.verifyEmail,
        verifyProviderEmail: this.accountOptions.verifyProviderEmail,
      }
    });
    this.flashMessagesService.show('Data successfully submitted', { classes: ['alert', 'alert-success'], timeout: 4000 });
  };
}