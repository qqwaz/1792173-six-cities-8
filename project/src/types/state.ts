import { Offer } from './offer';
import { City } from './city';
import { AuthInfo } from './authInfo';
import { SortType, AuthorizationStatus } from '../const';

export type State = {
  city: City,
  offers: Offer[],
  favorites: Offer[],
  sortType: SortType,
  isLoading: boolean,
  authorizationStatus: AuthorizationStatus,
  authInfo?: AuthInfo,
}
