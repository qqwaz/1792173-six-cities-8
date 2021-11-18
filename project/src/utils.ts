import dayjs from 'dayjs';
import { Offer } from './types/offer';
import { Offers } from './mocks/offers';

export const getOffer = (id: string): Offer | undefined => {
  const offerId = Number.parseInt(id, 10);
  return Offers.find((offer) => offer.id === offerId);
};

export const groupOffersByCity = (offers: Offer[]): Record<string, Offer[]> => offers
  .reduce((acc, offer) => {
    const city = offer.city.name;
    acc[city] = acc[city] ? [...acc[city], offer] : [offer];
    return acc;
  }, {} as Record<string, Offer[]>);

export function dateToMonth(date: Date): string {
  return dayjs(date).format('MMMM YYYY');
}

export function dateToDay(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export function dateToISO(date: Date): string {
  return dayjs(date).toISOString();
}


