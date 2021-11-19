import { Offer } from './offer';
import { City } from './city';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  GetOffers = 'main/getOffers',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: City;
};

export type GetOffersAction = {
  type: ActionType.GetOffers;
  payload: Offer[];
};

export type Actions = ChangeCityAction | GetOffersAction;
