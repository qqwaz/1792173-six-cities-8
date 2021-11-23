import { createAction } from '@reduxjs/toolkit';
import { saveToken, dropToken } from '../services/token';
import { Offer, OfferServer } from '../types/offer';
import { City } from '../types/city';
import { Comment, CommentServer } from '../types/comment';
import { AuthInfo, AuthInfoServer } from '../types/auth-info';
import { AuthData } from '../types/auth-data';
import {toast} from 'react-toastify';
import { ActionType, ThunkActionResult } from '../types/action';
import {
  SortType,
  AuthorizationStatus,
  APIRoute,
  AppRoute,
  AUTH_WRONG_CREDS_MESSAGE,
  REVIEW_NOT_UPLOADED_MESSAGE,
  FAVORITE_NOT_CHANGED_MESSAGE
} from '../const';
import {
  adaptAuthInfoToClient,
  adaptOffersToClient,
  adaptOfferToClient,
  adaptCommentsToClient
} from '../services/adapter';

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
  ActionType.Loading,
);

export const sending = createAction(
  ActionType.Sending,
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
  (info: AuthInfo) => ({
    payload: info,
  }));

export const fetchOffers = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loading());
    const { data } = await api.get<OfferServer[]>(APIRoute.Offers);
    dispatch(getOffers(adaptOffersToClient(data)));
  };

export const fetchFavorites = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<OfferServer[]>(APIRoute.Favorites);
    dispatch(getFavorites(adaptOffersToClient(data)));
  };

export const fetchOfferById = (id: string) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data }  = await api.get<OfferServer>(`${APIRoute.Offers}/${id}`);
      dispatch(getCurrentOffer(adaptOfferToClient(data)));
    } catch {
      dispatch(getCurrentOffer(undefined));
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  };

export const fetchNearbiesById = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<OfferServer[]>(APIRoute.Nearbies.replace(':hotel_id', id));
    dispatch(getNearbies(adaptOffersToClient(data)));
  };

export const fetchReviewsById =  (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<CommentServer[]>(APIRoute.Reviews.replace(':hotel_id', id));
    dispatch(getReviews(adaptCommentsToClient(data)));
  };

export const postReview = (id: string, comment: string, rating: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try{
      dispatch(sending(true));
      const { data } = await api.post<CommentServer[]>(APIRoute.Reviews.replace(':hotel_id', id), {comment, rating});
      dispatch(getReviews(adaptCommentsToClient(data)));
    } catch {
      toast.info(REVIEW_NOT_UPLOADED_MESSAGE);
    } finally {
      dispatch(sending(false));
    }
  };

export const postFavorite =  (id: string, status: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try{
      const { data } = await api.post<OfferServer>(APIRoute.FavoriteSwitch.replace(':hotel_id', id).replace(':status', status));
      dispatch(setFavoriteStatus(adaptOfferToClient(data)));
    } catch {
      toast.info(FAVORITE_NOT_CHANGED_MESSAGE);
    }
  };

export const checkAuth = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<AuthInfoServer>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(getAuthInfo(adaptAuthInfoToClient(data)));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  };

export const login = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<AuthInfoServer>(APIRoute.Login, { email, password });
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(getAuthInfo(adaptAuthInfoToClient(data)));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      toast.info(AUTH_WRONG_CREDS_MESSAGE);
    }
  };

export const logout = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
