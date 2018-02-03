import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActionsObservable } from 'redux-observable';
import { GET, FORM_CHANGED, UPDATE_SUCCESS, UPDATE_ERROR } from '../actions';
import { Observable } from 'rxjs/Observable';
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

  // login = (action$: ActionsObservable) => {
  //   return action$.ofType(SessionActions.LOGIN_USER)
  //     .mergeMap(({payload}) => {
  //       return this.http.post(`${BASE_URL}/auth/login`, payload)
  //         .map(result => ({
  //           type: SessionActions.LOGIN_USER_SUCCESS,
  //           payload: result.json().meta
  //         }))
  //         .catch(error => Observable.of({
  //           type: SessionActions.LOGIN_USER_ERROR
  //         }));
  //       });
  // }

  // get = (action$) => {
  //   return action$.ofType(GET);
  // }

  // update = (action$: ActionsObservable) => {
  //   return action$.ofType(FORM_CHANGED);
  // }

  get = (action$: ActionsObservable) => {
    return action$.ofType(GET)
      .mergeMap(({}) => {
        return this.http.jsonp('https://accounts.gigya.com/accounts.getPolicies?userkey=AJA3Cw9XcJZf&secret=1J%2BYxAY47khnuXf4GKSggLpPFBbQv8Hq&apikey=3_inujb44QPskKBok5VwhYnqy40eaVrwAJXXLsqaHRI_6DCM3KHhxNXjjcFQe0PASK&format=jsonp&callback=JSONP_CALLBACK', 'JSONP_CALLBACK')
          .map(res => ({
            type: GET
          }))
          .catch(error => Observable.of({
            type: UPDATE_ERROR
          }));
      });
  }

  // update = (action) => {
  //   return action.ofType(FORM_CHANGED)
  //     .mergeMap(({ payload }) => {
  //       return this.http.jsonp(`${this.accounts.setPolicies}?userkey=${this.credentials.userKey}&secret=${this.credentials.secret}&apikey=${this.credentials.apiKey}&accountOptions=${action.payload}&format=jsonp&callback=JSONP_CALLBACK`, action.payload)
  //         .map(result => ({
  //           type: UPDATE_SUCCESS,
  //           payload: result
  //         }))
  //         .catch(error => Observable.of({
  //           type: UPDATE_ERROR
  //         }));
  //     });
  // }

}
