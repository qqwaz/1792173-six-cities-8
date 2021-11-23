import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { Comment } from '../../types/comment';
import { SortType } from '../../const';

export const getCity = (state: State): City => state[NameSpace.Data].city;
export const getSortType = (state: State): SortType => state[NameSpace.Data].sortType;
export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getFavorites = (state: State): Offer[] => state[NameSpace.Data].favorites;
export const getNearbies = (state: State): Offer[] => state[NameSpace.Data].nearbies;
export const getReviews = (state: State): Comment[] => state[NameSpace.Data].reviews;
export const getCurrentOffer = (state: State): Offer | undefined => state[NameSpace.Data].currentOffer;
export const getIsLoading = (state: State): boolean => state[NameSpace.Data].isLoading;
