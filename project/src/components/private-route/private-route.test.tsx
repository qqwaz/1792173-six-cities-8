import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import PrivateRoute from './private-route';
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

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render PrivateRoute with auth', () => {
    render(
      <Provider store={storeWithAuth}>
        <Router history={history}>
          <Route exact path="/login"><h1>Public Route</h1></Route>
          <PrivateRoute
            exact
            path="/private"
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>);
    expect(screen.queryByText(/Private Route/i)).toBeInTheDocument();
  });

  it('should render PrivateRoute withot auth', () => {
    render(
      <Provider store={storeWithoutAuth}>
        <Router history={history}>
          <Route exact path="/login"><h1>Public Route</h1></Route>
          <PrivateRoute
            exact
            path="/private"
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>);
    expect(screen.queryByText(/Public Route/i)).toBeInTheDocument();
  });

});
