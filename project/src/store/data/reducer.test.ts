import { data } from './reducer';
import { changeCity, changeSortType, getCurrentOffer, getFavorites, getNearbies, getOffers, getReviews, setFavoriteStatus, loading } from '../actions';
import { DefaultCity, SortType, Cities } from '../../const';
import { OffersMock, CommentsMock } from '../../services/mocks';

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        city: DefaultCity,
        currentOffer: undefined,
        offers: [],
        favorites: [],
        nearbies: [],
        sortType: SortType.Popular,
        reviews: [],
        isLoading: true,
      });
  });

  it('should set city', () => {
    const state = {
      city: DefaultCity,
      currentOffer: undefined,
      offers: [],
      favorites: [],
      nearbies: [],
      sortType: SortType.ToHigh,
      reviews: [],
      isLoading: true,
    };
    expect(data(state, changeCity(Cities[2])))
      .toEqual({
        city: Cities[2],
        currentOffer: undefined,
        offers: [],
        favorites: [],
        nearbies: [],
        sortType: SortType.Popular,
        reviews: [],
        isLoading: true,
      });
  });

  it('should get offers', () => {
    const state = {
      city: Cities[2],
      currentOffer: undefined,
      offers: [],
      favorites: [],
      nearbies: [],
      sortType: SortType.Popular,
      reviews: [],
      isLoading: true,
    };
    expect(data(state, getOffers(OffersMock)))
      .toEqual({
        city: Cities[2],
        currentOffer: undefined,
        offers: OffersMock,
        favorites: [],
        nearbies: [],
        sortType: SortType.Popular,
        reviews: [],
        isLoading: false,
      });
  });

  it('should get favorites', () => {
    const state = {
      city: Cities[2],
      currentOffer: undefined,
      offers: OffersMock,
      favorites: [],
      nearbies: [],
      sortType: SortType.Popular,
      reviews: [],
      isLoading: false,
    };
    expect(data(state, getFavorites(OffersMock)))
      .toEqual({
        city: Cities[2],
        currentOffer: undefined,
        offers: OffersMock,
        favorites: OffersMock,
        nearbies: [],
        sortType: SortType.Popular,
        reviews: [],
        isLoading: false,
      });
  });

  it('should get nearbies', () => {
    const state = {
      city: Cities[2],
      currentOffer: undefined,
      offers: OffersMock,
      favorites: OffersMock,
      nearbies: [],
      sortType: SortType.Popular,
      reviews: [],
      isLoading: false,
    };
    expect(data(state, getNearbies(OffersMock)))
      .toEqual({
        city: Cities[2],
        currentOffer: undefined,
        offers: OffersMock,
        favorites: OffersMock,
        nearbies: OffersMock,
        sortType: SortType.Popular,
        reviews: [],
        isLoading: false,
      });
  });

  it('should get current offer', () => {
    const state = {
      city: Cities[2],
      currentOffer: undefined,
      offers: OffersMock,
      favorites: OffersMock,
      nearbies: OffersMock,
      sortType: SortType.Popular,
      reviews: [],
      isLoading: false,
    };
    expect(data(state, getCurrentOffer(OffersMock[0])))
      .toEqual({
        city: Cities[2],
        currentOffer: OffersMock[0],
        offers: OffersMock,
        favorites: OffersMock,
        nearbies: OffersMock,
        sortType: SortType.Popular,
        reviews: [],
        isLoading: false,
      });
  });

  it('should get reviews', () => {
    const state = {
      city: Cities[2],
      currentOffer: OffersMock[0],
      offers: OffersMock,
      favorites: OffersMock,
      nearbies: OffersMock,
      sortType: SortType.Popular,
      reviews: [],
      isLoading: false,
    };
    expect(data(state, getReviews(CommentsMock)))
      .toEqual({
        city: Cities[2],
        currentOffer: OffersMock[0],
        offers: OffersMock,
        favorites: OffersMock,
        nearbies: OffersMock,
        sortType: SortType.Popular,
        reviews: CommentsMock,
        isLoading: false,
      });
  });

  it('should change sorting type', () => {
    const state = {
      city: Cities[2],
      currentOffer: OffersMock[0],
      offers: OffersMock,
      favorites: OffersMock,
      nearbies: OffersMock,
      sortType: SortType.Popular,
      reviews: CommentsMock,
      isLoading: false,
    };
    expect(data(state, changeSortType(SortType.TopFirst)))
      .toEqual({
        city: Cities[2],
        currentOffer: OffersMock[0],
        offers: OffersMock,
        favorites: OffersMock,
        nearbies: OffersMock,
        sortType: SortType.TopFirst,
        reviews: CommentsMock,
        isLoading: false,
      });
  });

  it('should set loading', () => {
    const state = {
      city: Cities[2],
      currentOffer: OffersMock[0],
      offers: OffersMock,
      favorites: OffersMock,
      nearbies: OffersMock,
      sortType: SortType.Popular,
      reviews: CommentsMock,
      isLoading: false,
    };
    expect(data(state, loading()))
      .toEqual({
        city: Cities[2],
        currentOffer: OffersMock[0],
        offers: OffersMock,
        favorites: OffersMock,
        nearbies: OffersMock,
        sortType: SortType.Popular,
        reviews: CommentsMock,
        isLoading: true,
      });
  });

  it('should set favorite', () => {
    const state = {
      city: Cities[2],
      currentOffer: OffersMock[0],
      offers: [],
      favorites: [],
      nearbies: [],
      sortType: SortType.Popular,
      reviews: CommentsMock,
      isLoading: false,
    };
    expect(data(state, setFavoriteStatus({...OffersMock[0], isFavorite: !OffersMock[0].isFavorite})))
      .toEqual({
        city: Cities[2],
        currentOffer: {
          ...OffersMock[0],
          isFavorite: !OffersMock[0].isFavorite,
        },
        offers: [],
        favorites: [],
        nearbies: [],
        sortType: SortType.Popular,
        reviews: CommentsMock,
        isLoading: false,
      });
  });


});
