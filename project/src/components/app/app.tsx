import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import MainPage from '../main-page/main-page';
import AuthPage from '../auth-page/auth-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-fount-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import Loading from '../loading/loading';
import { getIsLoading } from '../../store/data/selectors';
import { getAuthStatus } from '../../store/service/selectors';

function App(): JSX.Element {
  const isLoading = useSelector(getIsLoading);
  const authStatus = useSelector(getAuthStatus);

  if (isLoading || authStatus === AuthorizationStatus.Unknown) {
    return <Loading />;
  }

  const favoritesPageRender = () => <FavoritesPage />;

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <MainPage />
      </Route>
      <Route exact path={AppRoute.Auth}>
        <AuthPage />
      </Route>
      <PrivateRoute exact path={AppRoute.Favorites}
        render={favoritesPageRender}
      />
      <Route exact path={`${AppRoute.Offer}/:id`}>
        <OfferPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default App;
