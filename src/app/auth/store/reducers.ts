import {createReducer, on, Action} from '@ngrx/store';

import {AuthStateInterface} from 'src/app/auth/types/authState.interface';
import {
  registerAction,
  registerFailAction,
  registerSuccessAction,
} from 'src/app/auth/store/actions/register.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currenrUser: null,
  isLoggedIn: null,
  validationError: null,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationError: null,
    }),
  ),

  on(
    registerFailAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationError: action.errors,
    }),
  ),
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
