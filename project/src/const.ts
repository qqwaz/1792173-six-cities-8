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

export const SortTypes = {
  Popular: 'Popular',
  ToHigh: 'ToHigh',
  ToLow: 'ToLow',
  TopFirst: 'TopFirst',
} as const;

export const SortTypeTitles = {
  [SortTypes.Popular]: 'Popular',
  [SortTypes.ToHigh]: 'Price: low to high',
  [SortTypes.ToLow]: 'Price: high to low',
  [SortTypes.TopFirst]: 'Top rated first',
} as const;

export enum RatingComponentVariants {
  Review,
  PlaceCard,
  Property,
}

export enum PlaceCardComponentVariants {
  Favorites,
  NearPlace,
  Main,
}
