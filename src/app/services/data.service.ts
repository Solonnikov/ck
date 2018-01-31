import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {
  accounts = environment.accounts;
  credentials = environment.credentials;

  constructor(
    private http: HttpClient,
  ) {
  }

  getData(): Observable<any> {
    return this.http.jsonp(`${this.accounts.getPolicies}?userkey=${this.credentials.userKey}&secret=${this.credentials.secret}&apikey=${this.credentials.apiKey}&format=jsonp&callback=JSONP_CALLBACK`, 'JSONP_CALLBACK')
      .map(res => res);
  }

  editData(value: any): Observable<any> {
    const accountOptions = value;
    return this.http.jsonp(`${this.accounts.setPolicies}?userkey=${this.credentials.userKey}&secret=${this.credentials.secret}&apikey=${this.credentials.apiKey}&accountOptions=${accountOptions}&format=jsonp&callback=JSONP_CALLBACK`, 'JSONP_CALLBACK')
    .map(res => res);
  }
}
