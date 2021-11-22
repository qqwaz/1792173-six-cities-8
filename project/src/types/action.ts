import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';
import { AxiosInstance } from 'axios';
import { Offer } from './offer';
import { City } from './city';
import { SortType, AuthorizationStatus, AppRoute } from '../const';
import { AuthInfo } from './auth-info';
import { Comment } from './comment';

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export enum ActionType {
  ChangeCity = 'changeCity',
  GetOffers = 'getOffers',
  GetFavorites = 'getFavorites',
  GetNearbies = 'getNearbies',
  ChangeSortType = 'changeSortType',
  RequireAuthorization = 'requireAuthorization',
  RequireLogout = 'requireLogout',
  GetAuthInfo = 'getAuthInfo',
  Loading = 'loading',
  GetCurrentOffer = 'getCurrentOffer',
  GetReviews = 'getReviews',
  SetFavoriteStatus = 'setFavoriteStatus',
  RedirectToRoute = 'redirect',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: City;
};

export type GetOffersAction = {
  type: ActionType.GetOffers;
  payload: Offer[];
};

export type GetFavoritesAction = {
  type: ActionType.GetFavorites;
  payload: Offer[];
};

export type GetNearbiesAction = {
  type: ActionType.GetNearbies;
  payload: Offer[];
};

export type ChangeSortTypeAction = {
  type: ActionType.ChangeSortType;
  payload: SortType;
};

export type LoadingAction = {
  type: ActionType.Loading;
};

export type RequireAuthorizationAction = {
  type: ActionType.RequireAuthorization;
  payload: AuthorizationStatus,
};

export type RequireLogoutAction = {
  type: ActionType.RequireLogout;
};

export type GetAuthInfoAction = {
  type: ActionType.GetAuthInfo;
  payload?: AuthInfo,
};

export type GetCurrentOfferAction = {
  type: ActionType.GetCurrentOffer;
  payload?: Offer;
};

export type GetReviewsAction = {
  type: ActionType.GetReviews;
  payload: Comment[];
};

export type SetFavoriteStatusAction = {
  type: ActionType.SetFavoriteStatus;
  payload: Offer;
};

export type RedirectToRoute = {
  type: ActionType.RedirectToRoute;
  payload: AppRoute;
};

export type Actions =
  | ChangeCityAction
  | GetOffersAction
  | GetFavoritesAction
  | GetNearbiesAction
  | ChangeSortTypeAction
  | LoadingAction
  | RequireAuthorizationAction
  | RequireLogoutAction
  | GetAuthInfoAction
  | GetCurrentOfferAction
  | GetReviewsAction
  | SetFavoriteStatusAction
  | RedirectToRoute;
