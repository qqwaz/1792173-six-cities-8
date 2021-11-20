import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';
import { AxiosInstance } from 'axios';
import { Offer } from './offer';
import { City } from './city';
import { SortType, AuthorizationStatus } from '../const';

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export enum ActionType {
  ChangeCity = 'changeCity',
  GetOffers = 'getOffers',
  ChangeSortType = 'changeSortType',
  RequireAuthorization = 'requireAuthorization',
  RequireLogout = 'requireLogout',
  Loading = 'loading',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: City;
};

export type GetOffersAction = {
  type: ActionType.GetOffers;
  payload: Offer[];
};

export type ChangeSortTypeAction = {
  type: ActionType.ChangeSortType;
  payload: SortType;
};

export type LoadingAction = {
  type: ActionType.Loading;
};


export type RequireAuthorization = {
  type: ActionType.RequireAuthorization;
  payload: AuthorizationStatus;
};

export type RequireLogout = {
  type: ActionType.RequireLogout;
};

export type Actions =
  | ChangeCityAction
  | GetOffersAction
  | ChangeSortTypeAction
  | LoadingAction
  | RequireAuthorization
  | RequireLogout;
