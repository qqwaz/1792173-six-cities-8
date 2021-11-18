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

export const Cities = [
  {
    name: 'Paris',
  },
  {
    name: 'Cologne',
  },
  {
    name: 'Brussels',
  },
  {
    name: 'Amsterdam',
  },
  {
    name: 'Hamburg',
  },
  {
    name: 'Dusseldorf',
  }] as const;

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

export const SortType = {
  Popular: 'Popular',
  ToHigh: 'ToHigh',
  ToLow: 'ToLow',
  TopFirst: 'TopFirst',
} as const;

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

