import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import FavoritesLocations from './favorites-locations';
import { AuthorizationStatus, DefaultCity, SortType } from '../../const';
import { AuthInfoMock, OffersMock, CommentsMock } from '../../services/mocks';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { groupOffersByCity } from '../../utils';

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

describe('Component: FavoritesLocation', () => {
  it('should render FavoritesLocation', () => {
    const locations = groupOffersByCity(OffersMock);
    render(
      <Provider store={storeWithAuth}>
        <Router history={history}>
          {Object.entries(locations).map((location) => (
            <FavoritesLocations key={location[0]} location={location} />
          ))}
        </Router>
      </Provider>);
    expect(screen.getByText(new RegExp(Object.entries(locations)[0][0], 'i'))).toBeInTheDocument();
  });

});
