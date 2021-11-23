import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { AuthInfo } from '../../types/auth-info';
import { AuthorizationStatus } from '../../const';

export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.Service].authorizationStatus;
export const getIsSending = (state: State): boolean => state[NameSpace.Service].isSending;
export const getAuthInfo = (state: State): AuthInfo | undefined => state[NameSpace.Service].authInfo;
