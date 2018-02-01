import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
export class FormReduxComponent implements OnInit, OnChanges {
  // @select() allowUnverifiedLogin: Observable<AccountOptions>;
  // @select() defaultLanguage: Observable<AccountOptions>;
  // @select() loginIdentifierConflict: Observable<AccountOptions>;
  // @select() loginIdentifiers: Observable<AccountOptions>;
  // @select() preventLoginIDHarvesting: Observable<AccountOptions>;
  // @select() sendAccountDeletedEmail: Observable<AccountOptions>;
  // @select() sendWelcomeEmail: Observable<AccountOptions>;
  // @select() verifyEmail: Observable<AccountOptions>;
  // @select() verifyProviderEmail: Observable<AccountOptions>;

  @Input() formDefault: AccountOptions;
  editDataForm: FormGroup;

  @Output() dataEdited = new EventEmitter<AccountOptions>();

  constructor(
    private ngRedux: NgRedux<AccountOptions>,
    public fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getData();
  }

  ngOnChanges() {

  }

  getData() {
    this.ngRedux.dispatch({ type: GET });
  }

  createForm(): void {
    const defaultLanguageRegex: any = '([a-zA-Z])+';
    this.editDataForm = this.fb.group({
      allowUnverifiedLogin: [{ value: false, disabled: true }],
      defaultLanguage: ['en', Validators.compose([Validators.required, Validators.pattern(defaultLanguageRegex)])],
      loginIdentifierConflict: ['', Validators.required],
      loginIdentifiers: ['email', Validators.required],
      preventLoginIDHarvesting: [false, Validators.required],
      sendAccountDeletedEmail: [false, Validators.required],
      sendWelcomeEmail: [false, Validators.required],
      verifyEmail: [false, Validators.required],
      verifyProviderEmail: [false, Validators.required]
    });
  }

  onEditSubmit() {
    console.log('edited');
  }
}
