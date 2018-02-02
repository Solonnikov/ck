import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { LoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormComponent } from './components/form/form.component';
import { ReadonlyComponent } from './components/readonly/readonly.component';

import { DataService } from './services/data.service';
import { TestingService } from './services/testing.service';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { NgReduxFormModule, composeReducers, defaultFormReducer } from '@angular-redux/form';
import { combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { SessionEpics } from './services/session-epics';

import { IAppState, rootReducer, INITIAL_STATE } from './store';
import { FormReduxComponent } from './components/form-redux/form-redux.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormComponent,
    ReadonlyComponent,
    FormReduxComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FlashMessagesModule,
    LoadingModule,
    NgReduxModule,
    NgReduxFormModule,
    RouterModule.forRoot([
      { path: '', component: FormComponent },
      { path: 'readonly', component: ReadonlyComponent },
      { path: 'redux', component: FormReduxComponent }
    ])
  ],
  providers: [DataService, SessionEpics, TestingService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    private epics: SessionEpics
  ) {

    const middleware = [
      createEpicMiddleware(this.epics.update),
      createEpicMiddleware(this.epics.get),
    ];

    ngRedux.configureStore(rootReducer, INITIAL_STATE, middleware);
  }
}



