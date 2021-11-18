import { OfferType } from '../const';
import { User } from './user';

export type OfferImages = string[];

export type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
};

type City = {
  name: string,
  location: Location,
};

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
