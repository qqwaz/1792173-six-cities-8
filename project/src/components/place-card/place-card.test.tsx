import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import PlaceCard from './place-card';
import { AuthorizationStatus, DefaultCity, SortType, PlaceCardComponentVariant } from '../../const';
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

describe('Component: PlaceCard', () => {
  it('should render PlaceCard', () => {
    const { container } = render(
      <Provider store={storeWithAuth}>
        <Router history={history}>
          <PlaceCard
            variant={PlaceCardComponentVariant.Main}
            offer={OffersMock[0]}
            setActiveOfferId={undefined}
          />
        </Router>
      </Provider>);
    expect(container.firstChild).toHaveClass('cities__place-card place-card');
    expect(screen.getByText(new RegExp(OffersMock[0].title, 'i'))).toBeInTheDocument();
  });

});
