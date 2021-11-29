import { createReducer } from '@reduxjs/toolkit';
import { requireAuthorization, requireLogout, getAuthInfo, sending } from '../actions';
import { AuthorizationStatus } from '../../const';
import { ServiceState } from '../../types/state';

const initialState: ServiceState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: undefined,
  isSending: false,
};

export const service = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(getAuthInfo, (state, action) => {
      state.authInfo = action.payload;
    })
    .addCase(sending, (state, action) => {
      state.isSending = action.payload;
    });
});
