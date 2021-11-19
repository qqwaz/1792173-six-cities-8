import { Offer } from './offer';
import { City } from './city';
import { SortType } from '../const';

export type State = {
  city: City,
  offers: Offer[],
  sortType: SortType,
}
