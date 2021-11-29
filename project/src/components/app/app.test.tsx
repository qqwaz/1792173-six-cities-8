import { render, screen } from '@testing-library/react';
import redux, { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import App from './app';
import { AppRoute, AuthorizationStatus, DefaultCity, SortType } from '../../const';
import { OffersMock, AuthInfoMock, CommentsMock } from '../../services/mocks';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch <State, typeof api, Action>>(middlewares);
const history = createMemoryHistory();

const storeWithoutAuth = mockStore({
  DATA: {
    city: DefaultCity,
    currentOffer: undefined,
    offers: OffersMock,
    favorites: [],
    nearbies: [],
    sortType: SortType.Popular,
    reviews: [],
    isLoading: false,
  },
  SERVICE: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    authInfo: undefined,
    isSending: false,
  },
});

const storeWithAuth = mockStore({
  DATA: {
    city: DefaultCity,
    currentOffer: OffersMock[0],
    offers: OffersMock,
    favorites: OffersMock,
    nearbies: OffersMock,
    sortType: SortType.Popular,
    reviews: CommentsMock,
    isLoading: false,
  },
  SERVICE: {
    authorizationStatus: AuthorizationStatus.Auth,
    authInfo: AuthInfoMock,
    isSending: false,
  },
});

const storeWithoutOffers = mockStore({
  DATA: {
    city: DefaultCity,
    currentOffer: undefined,
    offers: [],
    favorites: [],
    nearbies: [],
    sortType: SortType.Popular,
    reviews: [],
    isLoading: false,
  },
  SERVICE: {
    authorizationStatus: AuthorizationStatus.Auth,
    authInfo: AuthInfoMock,
    isSending: false,
  },
});

const fakeAppWithoutAuth = (
  <Provider store={storeWithoutAuth}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

const fakeAppWithAuth = (
  <Provider store={storeWithAuth}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

const fakeAppWithoutOffers = (
  <Provider store={storeWithoutOffers}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render empty main', () => {
    history.push(AppRoute.Main);
    render(fakeAppWithoutOffers);
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${DefaultCity.name}`, 'i'))).toBeInTheDocument();
  });

  it('should render main', () => {
    history.push(AppRoute.Main);
    render(fakeAppWithAuth);
    expect(screen.getByText(/places/i)).toBeInTheDocument();
  });

  it('should render "not found"', () => {
    history.push('/fake');
    render(fakeAppWithAuth);
    expect(screen.getByText(/404: Page not found/i)).toBeInTheDocument();
  });

  it('should render login', () => {
    history.push(AppRoute.Auth);
    render(fakeAppWithoutAuth);
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'q@q.ru');
    userEvent.type(screen.getByTestId('password'), '1q');

    expect(screen.getByDisplayValue(/q@q.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1q/i)).toBeInTheDocument();
  });

  it('should render empty favorites', () => {
    history.push(AppRoute.Favorites);
    render(fakeAppWithoutOffers);
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render favorites', () => {
    history.push(AppRoute.Favorites);
    render(fakeAppWithAuth);
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render offer', () => {
    history.push(`${AppRoute.Offer}/${OffersMock[0].id.toString()}`);
    render(fakeAppWithAuth);
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  });

});

