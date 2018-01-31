import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { FlashMessagesService } from 'ngx-flash-messages';

import { AccountOptions } from '../../models/AccountOptions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  accountOptions: AccountOptions;
  res: any;
  public loading = false;

  @Input() formDefault: AccountOptions;
  editDataForm: FormGroup;

  @Output() dataEdited = new EventEmitter<AccountOptions>();

  constructor(
    public dataService: DataService,
    public flashMessagesService: FlashMessagesService,
    public fb: FormBuilder,
    public router: Router
  ) {
    this.createForm();

    // Listening for form fields changing
    this.editDataForm.controls['verifyEmail'].valueChanges.subscribe(verifyEmail => {
      if (verifyEmail === true) {
        this.editDataForm.get('allowUnverifiedLogin').enable();
        this.editDataForm.get('verifyProviderEmail').enable();
      } else if (verifyEmail === false) {
        this.editDataForm.get('allowUnverifiedLogin').setValue(false);
        this.editDataForm.get('allowUnverifiedLogin').disable();
        this.editDataForm.get('verifyProviderEmail').setValue(false);
        this.editDataForm.get('verifyProviderEmail').disable();
      }
    });
  }

  ngOnInit() {
    this.loading = true;
    this.dataService.getData().subscribe(res => {
      // Get data from the service
      this.accountOptions = res.accountOptions;
      this.res = res;
      this.loading = false;
      console.log(this.res);
      console.log(this.accountOptions);

      // Check for accountDeletedEmailTemplates field in emailNotifications to disable sendAccountDeletedEmail form field
      // if (this.res.emailNotifications.accountDeletedEmailTemplates === undefined) {
      //   this.editDataForm.get('sendAccountDeletedEmail').disable();
      // } else {
      //   this.editDataForm.get('sendAccountDeletedEmail').enable();
      // }

      // Patch data to the form
      this.editDataForm.patchValue({
        allowUnverifiedLogin: this.accountOptions.allowUnverifiedLogin,
        defaultLanguage: this.accountOptions.defaultLanguage,
        loginIdentifierConflict: this.accountOptions.loginIdentifierConflict,
        loginIdentifiers: this.accountOptions.loginIdentifiers,
        preventLoginIDHarvesting: this.accountOptions.preventLoginIDHarvesting,
        sendAccountDeletedEmail: this.accountOptions.sendAccountDeletedEmail,
        sendWelcomeEmail: this.accountOptions.sendWelcomeEmail,
        verifyEmail: this.accountOptions.verifyEmail,
        verifyProviderEmail: this.accountOptions.verifyProviderEmail,
      });
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    // Checking for changes and form validity
    if (changes['formDefault'] && typeof this.formDefault === 'object') {
      this.editDataForm.setValue(this.formDefault);
    }
  }

  // Creating the form
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

  // Submit form value
  onEditSubmit() {
    this.loading = true;
    this.dataEdited.emit(this.editDataForm.value);

    // Gets values including disabled fields
    const value = this.editDataForm.getRawValue();
    console.log(value);
    this.dataService.editData(JSON.stringify(value)).subscribe(res => {
      console.log(res);
      if (res.errorCode === 0) {
        this.flashMessagesService.show('Data successfully submitted', { classes: ['alert', 'alert-success'], timeout: 4000 });
        this.router.navigate(['/readonly']);
        this.loading = false;
      } else {
        this.flashMessagesService.show(`${res.errorMessage}: ${res.errorDetails}`, { classes: ['alert', 'alert-danger'], timeout: 4000 });
        this.loading = false;
      }
    });
  }
}

