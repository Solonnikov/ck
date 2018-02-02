import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActionsObservable } from 'redux-observable';
import { GET, FORM_CHANGED, UPDATE_SUCCESS, UPDATE_ERROR } from '../actions';
import { Observable } from 'rxjs/Rx';
import { IAppState } from '../store';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class SessionEpics {
  accounts = environment.accounts;
  credentials = environment.credentials;

  constructor(
    private http: HttpClient
  ) {
  }

  get = (action) => {
    return action.ofType(GET)
      .mergeMap(() => {
        return this.http.jsonp(`${this.accounts.getPolicies}?userkey=${this.credentials.userKey}&secret=${this.credentials.secret}&apikey=${this.credentials.apiKey}&format=jsonp&callback=JSONP_CALLBACK`, 'JSONP_CALLBACK')
          .map(result => console.log(result))
          .catch(error => Observable.of({
            type: UPDATE_ERROR
          }));
      });
  }

  update = (action) => {
    return action.ofType(FORM_CHANGED)
      .mergeMap(({ payload }) => {
        return this.http.jsonp(`${this.accounts.setPolicies}?userkey=${this.credentials.userKey}&secret=${this.credentials.secret}&apikey=${this.credentials.apiKey}&accountOptions=${payload}&format=jsonp&callback=JSONP_CALLBACK`, 'JSONP_CALLBACK')
          .map(result => ({
            type: UPDATE_SUCCESS,
            payload: result
          }))
          .catch(error => Observable.of({
            type: UPDATE_ERROR
          }));
      });
  }

}
