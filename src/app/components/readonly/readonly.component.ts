import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { FlashMessagesService } from 'ngx-flash-messages';

import { AccountOptions } from '../../models/AccountOptions';

@Component({
  selector: 'app-readonly',
  templateUrl: './readonly.component.html',
  styleUrls: ['./readonly.component.css']
})
export class ReadonlyComponent implements OnInit, OnChanges {
  accountOptions: AccountOptions;
  public loading = false;

  @Input() formDefault: any;
  editDataForm: FormGroup;

  @Output() dataEdited = new EventEmitter<AccountOptions>();

  constructor(
    public dataService: DataService,
    public flashMessagesService: FlashMessagesService,
    public fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loading = true;
    this.dataService.getData().subscribe(accountOptions => {
      // Get data from the service
      this.accountOptions = accountOptions.accountOptions;
      this.loading = false;
      console.log(this.accountOptions);

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
    this.editDataForm = this.fb.group({
      allowUnverifiedLogin: [{ value: '', disabled: true }, Validators.required],
      defaultLanguage: [{ value: '', disabled: true }, Validators.required],
      loginIdentifierConflict: [{ value: '', disabled: true }, Validators.required],
      loginIdentifiers: [{ value: '', disabled: true }, Validators.required],
      preventLoginIDHarvesting: [{ value: '', disabled: true }, Validators.required],
      sendAccountDeletedEmail: [{ value: '', disabled: true }, Validators.required],
      sendWelcomeEmail: [{ value: '', disabled: true }, Validators.required],
      verifyEmail: [{ value: '', disabled: true }, Validators.required],
      verifyProviderEmail: [{ value: '', disabled: true }, Validators.required],
    });
  }
}