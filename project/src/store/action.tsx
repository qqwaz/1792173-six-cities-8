import { Token, saveToken, dropToken } from '../services/token';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { AuthInfo } from '../types/authInfo';
import { AuthData } from '../types/authData';
import { SortType, AuthorizationStatus, APIRoute, AppRoute } from '../const';
import { adaptAuthInfoToClient, adaptOffersToClient } from '../services/adapter';
import browserHistory from '../browser-history';
import {
  ActionType,
  ThunkActionResult,
  ChangeCityAction,
  LoadingAction,
  GetOffersAction,
  ChangeSortTypeAction,
  RequireAuthorization,
  RequireLogout
} from '../types/action';

export const changeCity = (city: City): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

export const getOffers = (offers: Offer[]): GetOffersAction => ({
  type: ActionType.GetOffers,
  payload: offers,
});

export const changeSortType = (sortType: SortType): ChangeSortTypeAction => ({
  type: ActionType.ChangeSortType,
  payload: sortType,
});

export const loading = (): LoadingAction => ({
  type: ActionType.Loading,
});

export const requireAuthorization = (authStatus: AuthorizationStatus, authInfo?: AuthInfo): RequireAuthorization => ({
  type: ActionType.RequireAuthorization,
  payload: {
    authStatus,
    authInfo,
  },
});

export const requireLogout = (): RequireLogout => ({
  type: ActionType.RequireLogout,
});

export const fetchOffers = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loading());
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(getOffers(adaptOffersToClient(data)));
  };

export const checkAuth = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login);
  };

export const login = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth, adaptAuthInfoToClient(data)));
    browserHistory.push(AppRoute.Main);
  };

export const logout = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
    browserHistory.push(AppRoute.Auth);
  };
