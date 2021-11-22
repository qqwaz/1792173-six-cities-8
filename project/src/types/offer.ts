import { OfferType } from '../const';
import { City } from './city';
import { Location } from './location';
import { OfferImages } from './offer-images';
import { User, UserServer } from './user';

export type Offer = {
  city: City,
  previewImage: string,
  images: OfferImages,
  title: string,
  isFavorite: boolean,
  isPremium: boolean,
  rating: number,
  type: OfferType,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: string[],
  host: User,
  description: string,
  location: Location,
  id: number,
};

export type OfferServer = {
  city: City,
  'preview_image': string,
  images: OfferImages,
  title: string,
  'is_favorite': boolean,
  'is_premium': boolean,
  rating: number,
  type: OfferType,
  bedrooms: number,
  'max_adults': number,
  price: number,
  goods: string[],
  host: UserServer,
  description: string,
  location: Location,
  id: number,
};
