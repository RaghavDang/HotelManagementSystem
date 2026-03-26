import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any }>()
);

export const restoreUser = createAction(
  '[Auth] Restore User',
  props<{ user: any }>()
);

export const logout = createAction('[Auth] Logout');
