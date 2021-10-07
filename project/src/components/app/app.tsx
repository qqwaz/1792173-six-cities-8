import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MainPage from '../main-page/main-page';
import AuthPage from '../auth-page/auth-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-fount-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offersCount: number;
}

function App(props: AppProps): JSX.Element {
  const {
    offersCount = 5,
  } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage offersCount={offersCount} />
        </Route>
        <Route exact path={AppRoute.Auth}>
          <AuthPage />
        </Route>
        <PrivateRoute exact path={AppRoute.Favorites}
          render={() => <FavoritesPage />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
        <Route exact path={AppRoute.Offer}>
          <OfferPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
