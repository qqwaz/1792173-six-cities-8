import { Offer } from './offer';
import { Comment } from './comment';
import { City } from './city';
import { AuthInfo } from './auth-info';
import { SortType, AuthorizationStatus } from '../const';
import { RootState } from '../store/root-reducer';

export type ServiceState = {
  authorizationStatus: AuthorizationStatus,
  authInfo?: AuthInfo,
  isSending: boolean,
}

export type DataState = {
  city: City,
  offers: Offer[],
  favorites: Offer[],
  nearbies: Offer[],
  sortType: SortType,
  currentOffer?: Offer,
  reviews: Comment[],
  isLoading: boolean,
}

export type State = RootState;
