import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AccountOptions } from '../models/AccountOptions';

@Injectable()
export class DataService {
  accounts = environment.accounts;
  credentials = environment.credentials;

  apiGet: string = `${this.accounts.getPolicies}?userkey=${this.credentials.userKey}&secret=${this.credentials.secret}&apikey=${this.credentials.apiKey}&format=jsonp&callback=JSONP_CALLBACK`;

  apiSet: string;
  callback = 'JSONP_CALLBACK';

  constructor(
    private http: HttpClient,
  ) {
  }

  getData(): Observable<any> {
    return this.http.jsonp(this.apiGet, this.callback);
  }

  updateData(accountOptions: any): Observable<any> {
    const apiSet = `${this.accounts.setPolicies}?userkey=${this.credentials.userKey}&secret=${this.credentials.secret}&accountOptions=${accountOptions}&apikey=${this.credentials.apiKey}&format=jsonp&callback=JSONP_CALLBACK`;
    this.apiSet = apiSet;
    return this.http.jsonp(this.apiSet, this.callback);
  }
}
