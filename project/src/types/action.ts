import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';
import { AxiosInstance } from 'axios';
import { Action } from 'redux';

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

export enum ActionType {
  ChangeCity = 'changeCity',
  GetOffers = 'getOffers',
  GetFavorites = 'getFavorites',
  GetNearbies = 'getNearbies',
  ChangeSortType = 'changeSortType',
  RequireAuthorization = 'requireAuthorization',
  RequireLogout = 'requireLogout',
  GetAuthInfo = 'getAuthInfo',
  Load = 'load',
  Send = 'send',
  GetCurrentOffer = 'getCurrentOffer',
  GetReviews = 'getReviews',
  SetFavoriteStatus = 'setFavoriteStatus',
  RedirectToRoute = 'redirect',
}

