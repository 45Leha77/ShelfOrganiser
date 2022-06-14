import { Action, createReducer, on } from '@ngrx/store';
import { authSuccess, logout, setErrorMessage } from './authorization.actions';
import { AuthState, initialState } from './authorization.state';

const _authReducer = createReducer(
  initialState,
  on(authSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
