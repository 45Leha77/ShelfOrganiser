import { createAction, props } from '@ngrx/store';
import { User } from 'firebase/auth';

export const AUTH_START = '[Auth] auth start';
export const AUTH_SUCCESS = '[Auth] auth success';

export const AUTH_AUTO = '[Auth] auto login';

export const AUTH_LOGOUT = '[Auth] logout';

export const SET_ERROR_MESSAGE = '[Auth] set error message';

export const authStart = createAction(
  AUTH_START,
  props<{ user: { email: string; password: string } }>()
);

export const authSuccess = createAction(
  AUTH_SUCCESS,
  props<{ user: User; redirect: boolean }>()
);

export const authAuto = createAction(AUTH_AUTO);

export const logout = createAction(AUTH_LOGOUT);

export const logoutAuto = createAction(AUTH_LOGOUT);

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>()
);
