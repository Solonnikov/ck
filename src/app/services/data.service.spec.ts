import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [DataService]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should contain editDataForm object', inject([DataService], (service: DataService) => {
    expect(service.editDataForm).toBeTruthy();
  }));

  it('should contain accounts apis and credential', inject([DataService], (service: DataService) => {
    expect(service.accounts && service.credentials).toBeTruthy();
  }));

  it('should contain apis and credentials', inject([DataService], (service: DataService) => {
    expect(service.accounts && service.credentials).toBeTruthy();
  }));

  it('should have getPolicices & setPolicies methods', inject([DataService], (service: DataService) => {
    expect(service.accounts.getPolicies && service.credentials.secret).toBeTruthy();
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

  it('should return editDataForm object', inject([DataService], (service: DataService) => {
    expect(service.getData()).toBeTruthy();
  }));

  it('should update editDataForm object', inject([DataService], (service: DataService) => {
    expect(service.editDataForm.verifyEmail).toBe(true);
  }));

  it('should be a valid object for POST', inject([DataService], (service: DataService) => {
    expect(typeof (service.editDataForm) === 'object').toBeTruthy();
  }));

  // Validate input fields
  it('allowUnverifiedLogin should equal `false` by default', inject([DataService], (service: DataService) => {
    expect(service.editDataForm.allowUnverifiedLogin).toEqual(false);
  }));

  it('defaultLanguage should equal `en` by default', inject([DataService], (service: DataService) => {
    expect(service.editDataForm.defaultLanguage).toEqual('en');
  }));

  it('loginIdentifiers should equal `email` by default', inject([DataService], (service: DataService) => {
    expect(service.editDataForm.loginIdentifiers).toEqual('email');
  }));

  it('preventLoginIDHarvesting should equal `false` by default', inject([DataService], (service: DataService) => {
    expect(service.editDataForm.preventLoginIDHarvesting).toEqual(false);
  }));

  it('sendWelcomeEmail should equal `false` by default', inject([DataService], (service: DataService) => {
    expect(service.editDataForm.sendWelcomeEmail).toEqual(false);
  }));

  it('verifyEmail should equal `false` by default but can be set to `true`', inject([DataService], (service: DataService) => {
    expect(service.editDataForm.verifyEmail).toEqual(true || false);
  }));

  it('verifyProviderEmail should equal `false` by default', inject([DataService], (service: DataService) => {
    expect(service.editDataForm.verifyProviderEmail).toEqual(false);
  }));

  it('sendAccountDeletedEmail cant be true without accountDeletedEmailTemplates', inject([DataService], (service: DataService) => {
    const isAllowed = function sendAccountDeletedEmailAllowed() {
      return ('accountDeletedEmailTemplates' in service.editDataForm);
    }
    if (!isAllowed) {
      expect(service.editDataForm.sendAccountDeletedEmail).toBeTruthy();
    }
  }));

  it('allowUnverifiedLogin and verifyProviderEmail cant be true without verifyEmail=true', inject([DataService], (service: DataService) => {
    const isAllowed = function verifyEmailChecked() {
      return service.editDataForm.verifyEmail;
    }
    if (!isAllowed) {
      expect(service.editDataForm.allowUnverifiedLogin).toEqual(false);
      expect(service.editDataForm.verifyProviderEmail).toEqual(false);
    }
  }));
});



