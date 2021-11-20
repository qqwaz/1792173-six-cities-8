import dayjs from 'dayjs';
import { Offer } from './types/offer';
import { City } from './types/city';
import { SortType } from './const';

export const getOffer = (id: string, offers: Offer[]): Offer | undefined => {
  const offerId = Number.parseInt(id, 10);
  return offers.find((offer) => offer.id === offerId);
};

export const groupOffersByCity = (offers: Offer[]): Record<string, Offer[]> => offers
  .reduce((acc, offer) => {
    const city = offer.city.name;
    acc[city] = acc[city] ? [...acc[city], offer] : [offer];
    return acc;
  }, {} as Record<string, Offer[]>);

export const getOffersByCity = (city: City, offers: Offer[]): Offer[] => offers.filter((x) => x.city.name === city.name);

export function dateToMonth(date: Date): string {
  return dayjs(date).format('MMMM YYYY');
}

export function dateToDay(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export function dateToISO(date: Date): string {
  return dayjs(date).toISOString();
}

export const sortOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  switch (sortType) {
    case SortType.ToHigh:
      return offers.sort((a, b) => a.price - b.price);
    case SortType.ToLow:
      return offers.sort((a, b) => b.price - a.price);
    case SortType.TopFirst:
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};
