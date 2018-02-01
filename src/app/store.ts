import { GET, UPDATE } from './actions';

export interface AccountOptions {
  // allowUnverifiedLogin: boolean;
  // defaultLanguage: string
  // loginIdentifierConflict: string
  // loginIdentifiers: string
  // preventLoginIDHarvesting: boolean
  // sendAccountDeletedEmail: boolean
  // sendWelcomeEmail: boolean
  // verifyEmail: boolean
  // verifyProviderEmail: boolean,
  editDataForm: {
    allowUnverifiedLogin: boolean;
    defaultLanguage: string
    loginIdentifierConflict: string
    loginIdentifiers: string
    preventLoginIDHarvesting: boolean
    sendAccountDeletedEmail: boolean
    sendWelcomeEmail: boolean
    verifyEmail: boolean
    verifyProviderEmail: boolean,
  }
}

export const INITIAL_STATE: AccountOptions = {
  // allowUnverifiedLogin: false,
  // defaultLanguage: 'en',
  // loginIdentifierConflict: 'ignore',
  // loginIdentifiers: 'email',
  // preventLoginIDHarvesting: false,
  // sendAccountDeletedEmail: false,
  // sendWelcomeEmail: false,
  // verifyEmail: false,
  // verifyProviderEmail: false,
  editDataForm: {
    allowUnverifiedLogin: false,
    defaultLanguage: 'en',
    loginIdentifierConflict: 'ignore',
    loginIdentifiers: 'email',
    preventLoginIDHarvesting: false,
    sendAccountDeletedEmail: false,
    sendWelcomeEmail: false,
    verifyEmail: false,
    verifyProviderEmail: false,
  }
}

export function rootReducer(state: AccountOptions, action): AccountOptions {
  switch (action.type) {
    case GET: return {
      // allowUnverifiedLogin: state.allowUnverifiedLogin,
      // defaultLanguage: state.defaultLanguage,
      // loginIdentifierConflict: state.loginIdentifierConflict,
      // loginIdentifiers: state.loginIdentifiers,
      // preventLoginIDHarvesting: state.preventLoginIDHarvesting,
      // sendAccountDeletedEmail: state.sendAccountDeletedEmail,
      // sendWelcomeEmail: state.sendWelcomeEmail,
      // verifyEmail: state.verifyEmail,
      // verifyProviderEmail: state.verifyProviderEmail,
      editDataForm: state.editDataForm
    }
  }
  return state;
}
