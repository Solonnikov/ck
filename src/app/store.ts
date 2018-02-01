import { GET, UPDATE } from './actions';

export interface IAppState {
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

export const INITIAL_STATE: IAppState = {
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

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case GET: return {
      editDataForm: state.editDataForm
    }
    case UPDATE:
      console.log(action.payload);
      return { ...state, [action.payload.path]: action.payload.value }
  }
  return state;
}
