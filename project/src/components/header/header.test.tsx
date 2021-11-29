import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Header from './header';
import { AuthorizationStatus, DefaultCity, SortType } from '../../const';
import { AuthInfoMock, OffersMock, CommentsMock } from '../../services/mocks';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch <State, typeof api, Action>>(middlewares);
const history = createMemoryHistory();

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

describe('Component: Header', () => {
  it('should render Header with Auth', () => {
    render(
      <Provider store={storeWithAuth}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>);
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render Header without Auth', () => {
    render(
      <Provider store={storeWithoutAuth}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

});
