import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {
  accounts = environment.accounts;
  credentials = environment.credentials;

  // TODO remove later
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

  constructor(
    private http: HttpClient,
  ) {
    // TODO remove later
    const value = this.editDataForm.verifyEmail = true
    this.updateData(value);
  }

  getData(): Observable<any> {
    return this.http.jsonp(`${this.accounts.getPolicies}?userkey=${this.credentials.userKey}&secret=${this.credentials.secret}&apikey=${this.credentials.apiKey}&format=jsonp&callback=JSONP_CALLBACK`, 'JSONP_CALLBACK')
      .map(res => res);
  }

  updateData(value: any): Observable<any> {
    const accountOptions = value;
    return this.http.jsonp(`${this.accounts.setPolicies}?userkey=${this.credentials.userKey}&secret=${this.credentials.secret}&apikey=${this.credentials.apiKey}&accountOptions=${accountOptions}&format=jsonp&callback=JSONP_CALLBACK`, 'JSONP_CALLBACK')
      .map(res => res);
  }

  postData() {
    return this.editDataForm;
  }
}
