import { GET, GET_SUCCESS, GET_ERROR, FORM_CHANGED, UPDATE_SUCCESS, UPDATE_ERROR } from './actions';
import { AccountOptions } from './models/AccountOptions';

export interface IAppState {
  editDataForm: AccountOptions;
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

export function rootReducer(state: IAppState = INITIAL_STATE, action): IAppState {
  console.log(action.type, state.editDataForm);
  switch (action.type) {
    case GET: return {
      editDataForm: state.editDataForm
    }
    case GET_SUCCESS: return {
      editDataForm: action.payload
    }
    case FORM_CHANGED:
      return {
        editDataForm: state.editDataForm
      }
    default: return state;
  }
}
