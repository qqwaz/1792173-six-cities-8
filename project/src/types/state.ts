import { Offer } from './offer';
import { City } from './city';
import { SortType, AuthorizationStatus } from '../const';


export type State = {
  city: City,
  offers: Offer[],
  favorites: Offer[],
  sortType: SortType,
  isLoading: boolean,
  authorizationStatus: AuthorizationStatus,
}
