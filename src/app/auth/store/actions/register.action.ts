import {createAction, props} from '@ngrx/store';
import {ActionTypes} from 'src/app/auth/store/actionTypes';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{request: RegisterRequestInterface}>(),
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>(),
);

export const registerFailAction = createAction(ActionTypes.REGISTER_FAILURE);
