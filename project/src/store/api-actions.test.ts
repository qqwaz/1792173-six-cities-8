import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/store/state';
import { Action } from 'redux';
import {
  OffersMock,
  OffersServerMock,
  CommentsServerMock,
  FavoritesServerMock,
  AuthInfoServerMock,
  AuthDataMock
} from '../services/mocks';
import {
  fetchOffers,
  fetchFavorites,
  fetchNearbiesById,
  fetchOfferById,
  fetchReviewsById,
  postFavorite,
  postReview,
  checkAuth,
  login,
  logout
} from './api-actions';
import {
  getOffers,
  getFavorites,
  getNearbies,
  getReviews,
  getCurrentOffer,
  getAuthInfo,
  loading,
  sending,
  setFavoriteStatus,
  requireAuthorization,
  requireLogout,
  redirectToRoute
} from './actions';
import {
  adaptOffersToClient,
  adaptOfferToClient,
  adaptCommentsToClient,
  adaptAuthInfoToClient
} from '../services/adapter';
import { AuthorizationStatus, AppRoute, APIRoute } from '../const';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(
    middlewares,
  );

  it('should dispatch getOffers', async () => {
    const data = OffersServerMock;
    mockAPI.onGet(APIRoute.Offers).reply(200, data);
    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffers());

    expect(store.getActions()).toEqual([
      loading(),
      getOffers(adaptOffersToClient(data)),
    ]);
  });

  it('should dispatch getFavorites', async () => {
    const data = FavoritesServerMock;
    mockAPI.onGet(APIRoute.Favorites).reply(200, data);
    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFavorites());

    expect(store.getActions()).toEqual([
      getFavorites(adaptOffersToClient(data)),
    ]);
  });

  it('should dispatch getCurrentOffer successfully', async () => {
    const data = OffersServerMock[0];
    mockAPI.onGet(`${APIRoute.Offers}/${data.id}`).reply(200, data);
    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOfferById(data.id.toString()));

    expect(store.getActions()).toEqual([
      getCurrentOffer(adaptOfferToClient(data)),
    ]);
  });

  it('should dispatch getCurrentOffer wrong', async () => {
    mockAPI.onGet(`${APIRoute.Offers}/fake`).reply(404);
    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOfferById('fake'));

    expect(store.getActions()).toEqual([
      getCurrentOffer(undefined),
      redirectToRoute(AppRoute.NotFound),
    ]);
  });

  it('should dispatch getNearbies', async () => {
    const data = OffersServerMock;
    mockAPI.onGet(APIRoute.Nearbies.replace(':hotel_id', data[0].id)).reply(200, data);
    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchNearbiesById(data[0].id.toString()));

    expect(store.getActions()).toEqual([
      getNearbies(adaptOffersToClient(data)),
    ]);
  });

  it('should dispatch getReviews', async () => {
    const data = CommentsServerMock;
    const offerId = OffersServerMock[0].id;
    mockAPI.onGet(APIRoute.Reviews.replace(':hotel_id', offerId)).reply(200, data);
    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchReviewsById(offerId.toString()));

    expect(store.getActions()).toEqual([
      getReviews(adaptCommentsToClient(data)),
    ]);
  });

  it('should dispatch postReview', async () => {
    const reviews = CommentsServerMock;
    const offerId = OffersMock[0].id;
    mockAPI.onPost(APIRoute.Reviews.replace(':hotel_id', offerId)).reply(200, reviews);
    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(postReview(offerId.toString(), reviews[0].comment, reviews[0].rating));

    expect(store.getActions()).toEqual([
      sending(true),
      getReviews(adaptCommentsToClient(reviews)),
      sending(false),
    ]);
  });

  it('should dispatch postFavorite', async () => {
    const data = OffersMock[0];
    data.isFavorite = !(data.isFavorite);
    mockAPI.onPost(APIRoute.FavoriteSwitch.replace(':hotel_id', data.id).replace(':status', data.isFavorite.toString())).reply(200, data);
    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(postFavorite(data.id.toString(), data.isFavorite.toString()));

    expect(store.getActions()).toEqual([
      setFavoriteStatus(adaptOfferToClient(data)),
    ]);
  });

  it('should dispatch checkAuth successfully', async () => {
    const data = AuthInfoServerMock;
    mockAPI.onGet(APIRoute.Login).reply(200, data);
    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      getAuthInfo(adaptAuthInfoToClient(data)),
    ]);
  });

  it('should dispatch checkAuth wrong', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(404, []);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.NoAuth),
    ]);
  });

  it('should dispatch login', async () => {
    const authData = AuthDataMock;
    const authInfo = AuthInfoServerMock;
    mockAPI.onPost(APIRoute.Login).reply(200, authInfo);
    const store = mockStore();
    Storage.prototype.setItem = jest.fn();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(login(authData));

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      getAuthInfo(adaptAuthInfoToClient(authInfo)),
      redirectToRoute(AppRoute.Main),
    ]);
  });

  it('should dispatch logout', async () => {
    mockAPI.onDelete(APIRoute.Logout).reply(204);
    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(logout());

    expect(store.getActions()).toEqual([
      requireLogout(),
      getAuthInfo(undefined),
    ]);
  });
});
