import { City } from './types/city';

export enum AppRoute {
  Main = '/',
  Auth = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/oops',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/hotels',
  Favorites = '/favorite',
  FavoriteSwitch = '/favorite/:hotel_id/:status',
  Nearbies = '/hotels/:hotel_id/nearby',
  Reviews = '/comments/:hotel_id',
  Login = '/login',
  Logout = '/logout',
}

export const Cities: City[] = [
  {
    name: 'Paris',
    location: { latitude: 48.858906, longitude: 2.3120158, zoom: 10 },
  },
  {
    name: 'Cologne',
    location: { latitude: 50.95779, longitude: 6.8972834, zoom: 10 },
  },
  {
    name: 'Brussels',
    location: { latitude: 50.855024, longitude: 4.3403707, zoom: 10 },
  },
  {
    name: 'Amsterdam',
    location: { latitude: 52.3547498, longitude: 4.8339214, zoom: 10 },
  },
  {
    name: 'Hamburg',
    location: { latitude: 53.5586941, longitude: 9.7877415, zoom: 10 },
  },
  {
    name: 'Dusseldorf',
    location: { latitude: 51.2385413, longitude: 6.7443112, zoom: 10 },
  }];

export const DefaultCity = Cities[0];

export const Rating = [
  {
    rate: 5,
    title: 'perfect',
  },
  {
    rate: 4,
    title: 'good',
  },
  {
    rate: 3,
    title: 'not bad',
  },
  {
    rate: 2,
    title: 'badly',
  },
  {
    rate: 1,
    title: 'terribly',
  }] as const;

export enum SortType {
  Popular = 'Popular',
  ToHigh = 'ToHigh',
  ToLow = 'ToLow',
  TopFirst = 'TopFirst',
}

export const SortTypeTitle = {
  [SortType.Popular]: 'Popular',
  [SortType.ToHigh]: 'Price: low to high',
  [SortType.ToLow]: 'Price: high to low',
  [SortType.TopFirst]: 'Top rated first',
} as const;

export enum RatingComponentVariant {
  Review,
  PlaceCard,
  Property,
}

export enum PlaceCardComponentVariant {
  Favorites,
  NearPlace,
  Main,
}

export enum MapComponentVariant {
  Main,
  Offer,
}

export enum OfferType {
  Apartment = 'apartment',
  Room = 'room',
  House = 'house',
  Hotel = 'hotel'
}

export const OfferTypeTitle: Record<OfferType, string> = {
  [OfferType.Apartment]: 'Apartment',
  [OfferType.Room]: 'Private Room',
  [OfferType.House]: 'House',
  [OfferType.Hotel]: 'Hotel',
} as const;

export const OFFER_GALLERY_PICTURES_MAX_AMOUNT = 6;

export const MIN_REVIEW_COMMENT_LENGTH = 50;
export const MAX_REVIEW_COMMENT_LENGTH = 300;

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const AUTH_NOT_AUTHED_MESSAGE = 'Please, log in first';
export const AUTH_WRONG_CREDS_MESSAGE = 'Wrong credentials';
export const REVIEW_NOT_UPLOADED_MESSAGE = 'Review was not uploaded';
