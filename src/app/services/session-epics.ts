import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActionsObservable } from 'redux-observable';
import { GET, GET_SUCCESS, GET_ERROR, FORM_CHANGED, UPDATE_SUCCESS, UPDATE_ERROR } from '../actions';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../store';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';
import { FlashMessagesService } from 'ngx-flash-messages';

@Injectable()
export class SessionEpics {
  accounts = environment.accounts;
  credentials = environment.credentials;

  constructor(
    private http: HttpClient,
    public flashMessagesService: FlashMessagesService
  ) {
  }

  update = (action$: ActionsObservable<any>) => {
    return action$.ofType(FORM_CHANGED)
      .mergeMap(({ payload }) => {
        payload = JSON.stringify(payload);
        return this.http.jsonp(`${this.accounts.setPolicies}?userkey=${this.credentials.userKey}&secret=${this.credentials.secret}&apikey=${this.credentials.apiKey}&accountOptions=${payload}&format=jsonp&callback=JSONP_CALLBACK`, 'JSONP_CALLBACK')
          .map((result: any) => {
            if(result.statusCode === 200) {
              this.flashMessagesService.show(`${result.statusCode}`, { classes: ['alert', 'alert-success'], timeout: 3000 })
            } else {
              this.flashMessagesService.show(`${result.statusCode}`, { classes: ['alert', 'alert-danger'], timeout: 3000 })
            }
          }).map(result =>
            ({
              type: UPDATE_SUCCESS,
              payload: result
            }))
          .catch(error => Observable.of({
            type: UPDATE_ERROR
          }));
      });
  }


  get = (action$: ActionsObservable<any>) => {
    return action$.ofType(GET)
      .mergeMap(({ }) => {
        return this.http.jsonp(`${this.accounts.getPolicies}?userkey=${this.credentials.userKey}&secret=${this.credentials.secret}&apikey=${this.credentials.apiKey}&format=jsonp&callback=JSONP_CALLBACK`, 'JSONP_CALLBACK')
          .map((result: any) =>
            ({
              type: GET_SUCCESS,
              payload: result.accountOptions
            })
          )
          .catch(error => Observable.of({
            type: GET_ERROR
          }));
      });
  }
}
