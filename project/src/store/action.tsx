import { saveToken, dropToken } from '../services/token';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { Comment } from '../types/comment';
import { AuthInfo } from '../types/auth-info';
import { AuthData } from '../types/auth-data';
import {
  SortType,
  AuthorizationStatus,
  APIRoute,
  AppRoute,
  AUTH_NOT_AUTHED_MESSAGE,
  AUTH_WRONG_CREDS_MESSAGE,
  REVIEW_NOT_UPLOADED_MESSAGE
} from '../const';
import {
  adaptAuthInfoToClient,
  adaptOffersToClient,
  adaptOfferToClient,
  adaptCommentsToClient
} from '../services/adapter';
import {toast} from 'react-toastify';
import {
  ActionType,
  ThunkActionResult,
  ChangeCityAction,
  LoadingAction,
  GetOffersAction,
  GetFavoritesAction,
  GetNearbiesAction,
  ChangeSortTypeAction,
  RequireAuthorizationAction,
  RequireLogoutAction,
  GetAuthInfoAction,
  GetCurrentOfferAction,
  GetReviewsAction,
  RedirectToRoute
} from '../types/action';

export const redirectToRoute = (url: AppRoute): RedirectToRoute => ({
  type: ActionType.RedirectToRoute,
  payload: url,
});

export const changeCity = (city: City): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

export const getOffers = (offers: Offer[]): GetOffersAction => ({
  type: ActionType.GetOffers,
  payload: offers,
});

export const getFavorites = (offers: Offer[]): GetFavoritesAction => ({
  type: ActionType.GetFavorites,
  payload: offers,
});

export const getNearbies = (offers: Offer[]): GetNearbiesAction => ({
  type: ActionType.GetNearbies,
  payload: offers,
});

export const getCurrentOffer = (offer: Offer | undefined): GetCurrentOfferAction => ({
  type: ActionType.GetCurrentOffer,
  payload: offer,
});

export const getReviews = (reviews: Comment[]): GetReviewsAction => ({
  type: ActionType.GetReviews,
  payload: reviews,
});

export const changeSortType = (sortType: SortType): ChangeSortTypeAction => ({
  type: ActionType.ChangeSortType,
  payload: sortType,
});

export const loading = (): LoadingAction => ({
  type: ActionType.Loading,
});

export const requireAuthorization = (authStatus: AuthorizationStatus): RequireAuthorizationAction => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
});

export const requireLogout = (): RequireLogoutAction => ({
  type: ActionType.RequireLogout,
});

export const getAuthInfo = (info: AuthInfo): GetAuthInfoAction => ({
  type: ActionType.GetAuthInfo,
  payload: info,
});

export const fetchOffers = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loading());
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(getOffers(adaptOffersToClient(data)));
  };

export const fetchFavorites = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorites);
    dispatch(getFavorites(adaptOffersToClient(data)));
  };

export const fetchOfferById = (id: string) : ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data }  = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(getCurrentOffer(adaptOfferToClient(data)));
    } catch {
      dispatch(getCurrentOffer(undefined));
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  };

export const fetchNearbiesById = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Offer[]>(APIRoute.Nearbies.replace(':hotel_id', id));
    dispatch(getNearbies(adaptOffersToClient(data)));
  };

export const fetchReviewsById =  (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Comment[]>(APIRoute.Reviews.replace(':hotel_id', id));
    dispatch(getReviews(adaptCommentsToClient(data)));
  };

export const postReview = (id: string, comment: string, rating: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try{
      const { data } = await api.post<Comment[]>(APIRoute.Reviews.replace(':hotel_id', id), {comment, rating});
      dispatch(getReviews(adaptCommentsToClient(data)));
    } catch {
      toast.info(REVIEW_NOT_UPLOADED_MESSAGE);
    }
  };


export const checkAuth = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.info(AUTH_NOT_AUTHED_MESSAGE);
    }
  };

export const login = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post(APIRoute.Login, { email, password });
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
