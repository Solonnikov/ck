import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class TestingService {
  accounts = environment.accounts;
  credentials = environment.credentials;

  editDataForm = {
    allowUnverifiedLogin: false,
    defaultLanguage: 'en',
    loginIdentifierConflict: 'ignore',
    loginIdentifiers: 'email',
    preventLoginIDHarvesting: false,
    sendAccountDeletedEmail: false,
    sendWelcomeEmail: false,
    verifyEmail: false,
    verifyProviderEmail: false,
  }

  constructor() {
    this.updateData();
  }

  getData() {
    return this.editDataForm;
  }

  updateData() {
    this.editDataForm.verifyEmail = true;
  }

  postData() {
    return this.editDataForm;
  }
}
