import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import AuthPage from './auth-page';
import MainPage from '../main-page/main-page';
import { AuthorizationStatus, AppRoute, DefaultCity, SortType } from '../../const';
import { AuthInfoMock, OffersMock, CommentsMock } from '../../services/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const storeWithoutAuth = mockStore({
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


describe('Component: AuthPage', () => {
  it('should render AuthPage', () => {
    history.push('/login');

    render(
      <Provider store={storeWithoutAuth}>
        <Router history={history}>
          <AuthPage />
        </Router>
      </Provider>);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    userEvent.type(screen.getByTestId('email'), 'q@q.ru');
    userEvent.type(screen.getByTestId('password'), '1q');
    expect(screen.getByDisplayValue(/q@q.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1q/i)).toBeInTheDocument();
  });

  it('should redirect to Main', () => {
    history.push('/login');

    render(
      <Provider store={storeWithAuth}>
        <Router history={history}>

          <Switch>
            <Route exact path={AppRoute.Main}>
              <MainPage />
            </Route>
            <Route exact path={AppRoute.Auth}>
              <AuthPage />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.getByText(/places/i)).toBeInTheDocument();
  });

});
