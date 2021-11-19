import { ActionType, ChangeCityAction, GetOffersAction } from '../types/action';
import { Offer } from '../types/offer';
import { City } from '../types/city';

export const changeCity = (city: City): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

export const getOffers = (offers: Offer[]): GetOffersAction => ({
  type: ActionType.GetOffers,
  payload: offers,
});
