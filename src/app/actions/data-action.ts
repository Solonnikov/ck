import { Injectable } from '@angular/core';
// import { Action } from '@ngrx/store';
import { AccountOptions } from '../models/AccountOptions';

@Injectable()
export class DataActions {

  static GET = '[AccountOptions] Get Data';
  getData(): Action {
    return {
      type: DataActions.GET
    };
  }

  static UPDATE = '[AccountOptions] Update Data';
  updateData(): Action {
    return {
      type: DataActions.UPDATE
    };
  }
}