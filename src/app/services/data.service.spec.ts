import { JsonpModule, Jsonp, BaseRequestOptions, Response, ResponseOptions, Http } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { MockBackend } from "@angular/http/testing";
import { DataService } from './data.service';

describe('DataService:', () => {

  let service: DataService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JsonpModule, HttpClientModule],
      providers: [
        DataService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Jsonp,
          useFactory: (backend, options) => new Jsonp(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });

    // Get the MockBackend
    backend = TestBed.get(MockBackend);

    // Returns a service with the MockBackend so we can test with dummy responses
    service = TestBed.get(DataService);

  });

  // General service tests
  it('DataService should contain account APIs and credential', inject([DataService], (service: DataService) => {
    expect(service.accounts && service.credentials).toBeTruthy();
  }));

  it('DataService should contain getPolicices & setPolicies methods', inject([DataService], (service: DataService) => {
    expect(service.accounts.getPolicies && service.accounts.setPolicies).toBeTruthy();
  }));

  it('userKey should be valid', inject([DataService], (service: DataService) => {
    expect(service.credentials.userKey).toMatch('AJA3Cw9XcJZf');
  }));

  it('secret should be valid', inject([DataService], (service: DataService) => {
    expect(service.credentials.secret).toMatch('1J%2BYxAY47khnuXf4GKSggLpPFBbQv8Hq');
  }));

  it('apiKey should be valid', inject([DataService], (service: DataService) => {
    expect(service.credentials.apiKey).toMatch('3_inujb44QPskKBok5VwhYnqy40eaVrwAJXXLsqaHRI_6DCM3KHhxNXjjcFQe0PASK');
  }));

  // Http requests tests
  it('DataService should return Data', fakeAsync(() => {
    let response = {
      "accountOptions": {
        "verifyEmail": false,
        "verifyProviderEmail": false,
        "allowUnverifiedLogin": false,
        "preventLoginIDHarvesting": false,
        "sendWelcomeEmail": false,
        "sendAccountDeletedEmail": false,
        "defaultLanguage": "en",
        "loginIdentifierConflict": "failOnSiteConflictingIdentity",
        "loginIdentifiers": "email, providerEmail"
      }
    };

    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(response)
      }));
    });

    service.getData();
    tick();

    expect(response.accountOptions).toBeTruthy();
    expect(response.accountOptions.verifyEmail).toBe(false);
    expect(response.accountOptions.verifyProviderEmail).toBe(false);
    expect(response.accountOptions.allowUnverifiedLogin).toBe(false);
    expect(response.accountOptions.preventLoginIDHarvesting).toBe(false);
    expect(response.accountOptions.sendWelcomeEmail).toBe(false);
    expect(response.accountOptions.sendAccountDeletedEmail).toBe(false);
    expect(response.accountOptions.defaultLanguage).toBe('en');
    expect(response.accountOptions.loginIdentifierConflict).toBe('failOnSiteConflictingIdentity');
    expect(response.accountOptions.loginIdentifiers).toBe('email, providerEmail');
  }));
});


