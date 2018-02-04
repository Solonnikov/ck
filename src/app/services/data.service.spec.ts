import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientJsonpModule,
  HttpBackend,
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

  describe('getData()', () => {
    it('should return an Observable<any>', () => {
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
      request.flush(mockData);
    });
  });

  describe('updateData()', () => {
    it('should return an Observable<any>', () => {
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
      request.flush(mockData);
    });
  });
});


//     expect(response.accountOptions.verifyEmail).toBe(false);
//     expect(response.accountOptions.verifyProviderEmail).toBe(false);
//     expect(response.accountOptions.allowUnverifiedLogin).toBe(false);
//     expect(response.accountOptions.preventLoginIDHarvesting).toBe(false);
//     expect(response.accountOptions.sendWelcomeEmail).toBe(false);
//     expect(response.accountOptions.sendAccountDeletedEmail).toBe(false);
//     expect(response.accountOptions.defaultLanguage).toBe('en');
//     expect(response.accountOptions.loginIdentifierConflict).toBe('failOnSiteConflictingIdentity');
//     expect(response.accountOptions.loginIdentifiers).toBe('email, providerEmail');
//   }));
// });
