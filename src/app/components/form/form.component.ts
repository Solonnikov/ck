import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  accountOptions: any;
  loginIdentifiersArray = [];

  @Input() formDefault: any;
  editDataForm: FormGroup;

  @Output() dataEdited = new EventEmitter<any>();

  constructor(
    public dataService: DataService,
    public flashMessagesService: FlashMessagesService,
    public fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.dataService.getData().subscribe(accountOptions => {
      // Get data from the service
      this.accountOptions = accountOptions.accountOptions;
      console.log(this.accountOptions);

      // Create an array for loginIdentifiers
      this.loginIdentifiersArray = this.accountOptions.loginIdentifiers.split(',');

      // Patch data to the form
      this.editDataForm.patchValue({
        allowUnverifiedLogin: this.accountOptions.allowUnverifiedLogin,
        defaultLanguage: this.accountOptions.defaultLanguage,
        loginIdentifierConflict: this.accountOptions.loginIdentifierConflict,
        loginIdentifiers: this.loginIdentifiersArray,
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
      allowUnverifiedLogin: ['', Validators.required],
      defaultLanguage: ['', Validators.required],
      loginIdentifierConflict: ['', Validators.required],
      loginIdentifiers: ['', Validators.required],
      preventLoginIDHarvesting: ['', Validators.required],
      sendAccountDeletedEmail: ['', Validators.required],
      sendWelcomeEmail: ['', Validators.required],
      verifyEmail: ['', Validators.required],
      verifyProviderEmail: ['', Validators.required]
    });
  }

  // Submit form value
  onEditSubmit() {
    this.dataEdited.emit(this.editDataForm.value);
    let value = this.editDataForm.value;
    value.loginIdentifiers = String(value.loginIdentifiers);
    console.log(value);
    value.loginIdentifiers = 'email, username, providerEmail';
    this.dataService.editData(JSON.stringify(value)).subscribe(res => {
      console.log(res);
      this.flashMessagesService.show(res.statusReason, { classes: ['alert', 'alert-success'] });
    },
      err => {
        console.log(err);
        this.flashMessagesService.show(err.statusText, { classes: ['alert', 'alert-danger'] });
      });
  }
}

