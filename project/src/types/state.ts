import { Offer } from './offer';
import { Comment } from './comment';
import { City } from './city';
import { AuthInfo } from './auth-info';
import { SortType, AuthorizationStatus } from '../const';

export type State = {
  city: City,
  offers: Offer[],
  favorites: Offer[],
  nearbies: Offer[],
  sortType: SortType,
  currentOffer?: Offer,
  reviews: Comment[],
  isLoading: boolean,
  authorizationStatus: AuthorizationStatus,
  authInfo?: AuthInfo,
}
