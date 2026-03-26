import { createReducer, on } from '@ngrx/store';
import { loginSuccess,restoreUser, logout } from './auth.actions';

export interface AuthState {
  user: any | null;
}

const initialState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initialState,

  on(loginSuccess, (state, { user }) => ({
    ...state,
    user
  })),
 on(restoreUser, (state, { user }) => ({
    ...state,
    user
  })),
  on(logout, () => initialState)
);
