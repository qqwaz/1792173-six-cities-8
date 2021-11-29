import { service } from './reducer';
import { requireAuthorization, requireLogout, getAuthInfo, sending } from '../actions';
import { AuthorizationStatus } from '../../const';
import { AuthInfoMock } from '../../services/mocks';

describe('Reducer: service', () => {
  it('without additional parameters should return initial state', () => {
    expect(service(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        authInfo: undefined,
        isSending: false,
      });
  });

  it('should set authorizationStatus to Auth', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authInfo: undefined,
      isSending: false,
    };
    expect(service(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: undefined,
        isSending: false,
      });
  });

  it('should set authorizationStatus to NoAuth', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authInfo: undefined,
      isSending: false,
    };
    expect(service(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        authInfo: undefined,
        isSending: false,
      });
  });

  it('should set isSending to true', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authInfo: undefined,
      isSending: false,
    };
    expect(service(state, sending(true)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        authInfo: undefined,
        isSending: true,
      });
  });

  it('should set isSending to false', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authInfo: undefined,
      isSending: true,
    };
    expect(service(state, sending(false)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        authInfo: undefined,
        isSending: false,
      });
  });

  it('should set authInfo', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      authInfo: undefined,
      isSending: false,
    };
    expect(service(state, getAuthInfo(AuthInfoMock)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: AuthInfoMock,
        isSending: false,
      });
  });

  it('should logout', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      authInfo: AuthInfoMock,
      isSending: false,
    };
    expect(service(state, requireLogout()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        authInfo: AuthInfoMock,
        isSending: false,
      });
  });
});
