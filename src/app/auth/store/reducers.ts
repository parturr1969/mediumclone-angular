import {createReducer, on, Action} from '@ngrx/store';

import {AuthStateInterface} from 'src/app/auth/types/authState.interface';
import {registerAction} from 'src/app/auth/store/actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    }),
  ),
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
