import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from 'src/app/shared/types/appState.interface';
import {AuthStateInterface} from 'src/app/auth/types/authState.interface';

export const authFeatureSelector = createFeatureSelector<
  AppStateInterface,
  AuthStateInterface
>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting,
);

export const validationErrorSelector = createSelector(
  authFeatureSelector,
  (auttState: AuthStateInterface) => auttState.validationError,
);
