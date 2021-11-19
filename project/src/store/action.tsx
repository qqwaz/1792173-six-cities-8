import { ActionType, ChangeCityAction, GetOffersAction, ChangeSortTypeAction } from '../types/action';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { SortType } from '../const';

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

