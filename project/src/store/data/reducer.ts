import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType, getCurrentOffer, getFavorites, getNearbies, getOffers, getReviews, setFavoriteStatus, loading } from '../actions';
import { DataState } from '../../types/state';
import { DefaultCity, SortType } from '../../const';

const initialState: DataState = {
  city: DefaultCity,
  currentOffer: undefined,
  offers: [],
  favorites: [],
  nearbies: [],
  sortType: SortType.Popular,
  reviews: [],
  isLoading: true,
};

export const data = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.sortType = SortType.Popular;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
      state.isLoading = false;
    })
    .addCase(getFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(getNearbies, (state, action) => {
      state.nearbies = action.payload;
    })
    .addCase(getCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(getReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loading, (state) => {
      state.isLoading = true;
    })
    .addCase(setFavoriteStatus, (state, action) => {
      if (state.offers.length) {
        state.offers[state.offers.findIndex((x) => x.id === action.payload.id)].isFavorite = action.payload.isFavorite;
      }
      if (state.currentOffer) {
        state.currentOffer.isFavorite = action.payload.isFavorite;
      }
      if (state.favorites.length && !action.payload.isFavorite) {
        state.favorites.splice(state.favorites.findIndex((x) => x.id === action.payload.id), 1);
      }
    });
});
