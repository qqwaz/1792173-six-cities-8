import { Offer } from '../types/offer';
import { City } from '../types/city';
import { SortType, AuthorizationStatus, APIRoute } from '../const';
import { adaptOffersToClient } from '../services/adapter';
import {
  ActionType,
  ThunkActionResult,
  ChangeCityAction,
  LoadingAction,
  GetOffersAction,
  ChangeSortTypeAction,
  RequireAuthorization
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

export const requireAuthorization = (authStatus: AuthorizationStatus): RequireAuthorization => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loading());
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(getOffers(adaptOffersToClient(data)));
  };

