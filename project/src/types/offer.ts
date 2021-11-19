import { OfferType } from '../const';
import { City } from './city';
import { Location } from './location';
import { OfferImages } from './offerImages';
import { User } from './user';

export type Offer = {
  city: City,
  previewImage: string,
  images: OfferImages,
  title: string,
  isFavorite: boolean,
  isPremium: boolean,
  rating: number,
  type: string | OfferType,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: string[],
  host: User,
  description: string,
  location: Location,
  id: number,
};
