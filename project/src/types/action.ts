import { Offer } from './offer';
import { City } from './city';
import { SortType } from '../const';

export enum ActionType {
  ChangeCity = 'changeCity',
  GetOffers = 'getOffers',
  ChangeSortType = 'changeSortType',
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


export type Actions = ChangeCityAction | GetOffersAction | ChangeSortTypeAction;
