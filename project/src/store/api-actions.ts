import { saveToken, dropToken } from '../services/token';
import { OfferServer } from '../types/offer';
import { CommentServer } from '../types/comment';
import { AuthInfoServer } from '../types/auth-info';
import { AuthData } from '../types/auth-data';
import { toast } from 'react-toastify';
import { ThunkActionResult } from '../types/action';
import {
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
import {
  loading,
  getOffers,
  getFavorites,
  getCurrentOffer,
  redirectToRoute,
  getNearbies,
  getReviews,
  sending,
  setFavoriteStatus,
  requireAuthorization,
  getAuthInfo,
  requireLogout
} from './actions';

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

export const fetchOfferById = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<OfferServer>(`${APIRoute.Offers}/${id}`);
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

export const fetchReviewsById = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<CommentServer[]>(APIRoute.Reviews.replace(':hotel_id', id));
    dispatch(getReviews(adaptCommentsToClient(data)));
  };

export const postReview = (id: string, comment: string, rating: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(sending(true));
      const { data } = await api.post<CommentServer[]>(APIRoute.Reviews.replace(':hotel_id', id), { comment, rating });
      dispatch(getReviews(adaptCommentsToClient(data)));
    } catch (e) {
      toast.info(REVIEW_NOT_UPLOADED_MESSAGE);
      throw e;
    } finally {
      dispatch(sending(false));
    }
  };

export const postFavorite = (id: string, status: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
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
    dispatch(getAuthInfo(undefined));
  };
