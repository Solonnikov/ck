import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Redux imports
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { AccountOptions } from '../../models/AccountOptions';
import { GET, UPDATE } from '../../actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-form-redux',
  templateUrl: './form-redux.component.html',
  styleUrls: ['./form-redux.component.css']
})
export class FormReduxComponent implements OnInit, OnChanges {
  @Input() formDefault: AccountOptions;
  editDataForm: FormGroup;

  @Output() dataEdited = new EventEmitter<AccountOptions>();

  constructor(
    private ngRedux: NgRedux<IAppState>,
    public fb: FormBuilder
  ) {

    this.createForm();
  }

  ngOnInit() {
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Checking for changes and form validity
    if (changes['formDefault'] && typeof this.formDefault === 'object') {
      this.editDataForm.setValue(this.formDefault);
    }
  }

  getData() {
    this.ngRedux.dispatch({ type: GET });
  }

  createForm(): void {
    const defaultLanguageRegex: any = '([a-zA-Z])+';
    this.editDataForm = this.fb.group({
      allowUnverifiedLogin: [{ value: false, disabled: true }],
      defaultLanguage: ['en', Validators.compose([Validators.required, Validators.pattern(defaultLanguageRegex)])],
      loginIdentifierConflict: ['ignore', Validators.required],
      loginIdentifiers: ['email', Validators.required],
      preventLoginIDHarvesting: [false, Validators.required],
      sendAccountDeletedEmail: [false, Validators.required],
      sendWelcomeEmail: [false, Validators.required],
      verifyEmail: [false, Validators.required],
      verifyProviderEmail: [false, Validators.required]
    });
  }

  onEditSubmit() {
    this.dataEdited.emit(this.editDataForm.value);
    const value = this.editDataForm.getRawValue();
    console.log(value);
    this.ngRedux.dispatch({
      type: UPDATE, payload: {
        path: 'editDataForm',
        value: value
      }
    });
  }
}