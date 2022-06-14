import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './authorization.state';

export const USER_STATE_NAME = 'auth';

const getUserState = createFeatureSelector<AuthState>(USER_STATE_NAME);

export const getUser = createSelector(getUserState, (state) => {
  return state.user;
});

export const isAuthenticated = createSelector(getUserState, (state) => {
  return state.user ? true : false;
});

export const getToken = createSelector(getUserState, (state) => {
  return state.user ? state.user.refreshToken : null;
});

export const getErrorMessage = createSelector(getUserState, (state) => {
  return state.errorMessage;
});
