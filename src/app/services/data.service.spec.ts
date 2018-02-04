import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientJsonpModule,
  HttpBackend,
  HttpParams,
  JsonpClientBackend
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('ExampleService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService, { provide: JsonpClientBackend, useExisting: HttpBackend }]
    });

    service = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getData()', () => {
    it('should return an Observable', () => {
      const mockData = {
        allowUnverifiedLogin: false,
        defaultLanguage: 'en',
        loginIdentifierConflict: 'ignore',
        loginIdentifiers: 'email',
        preventLoginIDHarvesting: false,
        sendAccountDeletedEmail: false,
        sendWelcomeEmail: false,
        verifyEmail: false,
        verifyProviderEmail: false,
      };

      service.getData().subscribe(data => {
        expect(data).toEqual(mockData);
      });

      const request = httpMock.expectOne(request => request.url === service.apiGet);
      expect(request.request.method).toBe('JSONP');
      expect(request.request.url).toBe(service.apiGet);
      expect(request.request.responseType).toBe('json');
      expect(request.request.body).toBe(null);
      request.flush(mockData);
      httpMock.verify();
    });
    it('should return a correct data', () => {
      const mockData = {
        allowUnverifiedLogin: false,
        defaultLanguage: 'en',
        loginIdentifierConflict: 'ignore',
        loginIdentifiers: 'email',
        preventLoginIDHarvesting: false,
        sendAccountDeletedEmail: false,
        sendWelcomeEmail: false,
        verifyEmail: false,
        verifyProviderEmail: false,
      };

      service.getData().subscribe(data => {
        expect(data.allowUnverifiedLogin).toBe(false);
        expect(data.defaultLanguage).toBe('en');
        expect(data.loginIdentifierConflict).toBe('ignore');
        expect(data.loginIdentifiers).toBe('email');
        expect(data.preventLoginIDHarvesting).toBe(false);
        expect(data.sendAccountDeletedEmail).toBe(false);
        expect(data.sendWelcomeEmail).toBe(false);
        expect(data.verifyEmail).toBe(false);
        expect(data.verifyProviderEmail).toBe(false);
      });

      const request = httpMock.expectOne(request => request.url === service.apiGet);
      expect(request.request.method).toBe('JSONP');
      expect(request.request.url).toBe(service.apiGet);
      expect(request.request.responseType).toBe('json');
      expect(request.request.body).toBe(null);
      request.flush(mockData);
      httpMock.verify();
    });
  });

  describe('updateData()', () => {
    it('should return an Observable', () => {
      const mockData = {
        allowUnverifiedLogin: false,
        defaultLanguage: 'en',
        loginIdentifierConflict: 'ignore',
        loginIdentifiers: 'email',
        preventLoginIDHarvesting: false,
        sendAccountDeletedEmail: false,
        sendWelcomeEmail: false,
        verifyEmail: false,
        verifyProviderEmail: false,
      };

      service.updateData({ 'defaultLanguage': 'it' }).subscribe(data => {
        expect(data).toEqual(mockData);
      });

      const request = httpMock.expectOne(request => request.url === service.apiSet);
      expect(request.request.method).toBe('JSONP');
      expect(request.request.url).toBe(service.apiSet);
      expect(request.request.responseType).toBe('json');
      expect(request.request.body).toBe(null);
      request.flush(mockData);
      httpMock.verify();
    });

    it('should update data correctly', () => {
      const mockData = {
        allowUnverifiedLogin: false,
        defaultLanguage: 'en',
        loginIdentifierConflict: 'ignore',
        loginIdentifiers: 'email',
        preventLoginIDHarvesting: false,
        sendAccountDeletedEmail: false,
        sendWelcomeEmail: false,
        verifyEmail: false,
        verifyProviderEmail: false,
      };

      service.updateData({
        'loginIdentifiers': 'email',
        'defaultLanguage': 'it',
        'verifyEmail': true
      }).subscribe(data => {
        expect(data.loginIdentifiers).toBe('email');
        expect(data.defaultLanguage).toBe('it');
        expect(data.verifyEmail).toBe(true);
      });

      const request = httpMock.expectOne(request => request.url === service.apiSet);
      request.flush({
        loginIdentifiers: 'email',
        defaultLanguage: 'it',
        verifyEmail: true
      });
      httpMock.verify();
    });

    it(`should send an expected request`, () => {
      service.updateData({
        'loginIdentifierConflict': 'ignore',
        'sendWelcomeEmail': false,
        'verifyProviderEmail': false
      }).subscribe();

      httpMock.expectOne(request => {
        return request.method === 'JSONP' && request.responseType === 'json'
      }, `PUT to 'accounts.setPolicies'`);
    });
  });
}); 
