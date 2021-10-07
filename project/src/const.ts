export enum AppRoute {
  Main = '/',
  Auth = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
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
