import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { Comment } from '../types/comment';
import { AuthInfo } from '../types/auth-info';
import { ActionType } from '../types/action';
import {
  SortType,
  AuthorizationStatus,
  AppRoute} from '../const';

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

export const changeCity = createAction(
  ActionType.ChangeCity,
  (city: City) => ({
    payload: city,
  }));

export const getOffers = createAction(
  ActionType.GetOffers,
  (offers: Offer[]) => ({
    payload: offers,
  }));

export const getFavorites = createAction(
  ActionType.GetFavorites,
  (offers: Offer[]) => ({
    payload: offers,
  }));

export const getNearbies = createAction(
  ActionType.GetNearbies,
  (offers: Offer[]) => ({
    payload: offers,
  }));

export const getCurrentOffer = createAction(
  ActionType.GetCurrentOffer,
  (offer: Offer | undefined) => ({
    payload: offer,
  }));

export const getReviews = createAction(
  ActionType.GetReviews,
  (reviews: Comment[]) => ({
    payload: reviews,
  }));

export const setFavoriteStatus = createAction(
  ActionType.SetFavoriteStatus,
  (offer: Offer) => ({
    payload: offer,
  }));

export const changeSortType = createAction(
  ActionType.ChangeSortType,
  (sortType: SortType) => ({
    payload: sortType,
  }));

export const loading = createAction(
  ActionType.Load,
);

export const sending = createAction(
  ActionType.Send,
  (isSending: boolean) => ({
    payload: isSending,
  }),
);


export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }));

export const requireLogout = createAction(
  ActionType.RequireLogout,
);

export const getAuthInfo = createAction(
  ActionType.GetAuthInfo,
  (info?: AuthInfo) => ({
    payload: info,
  }));


