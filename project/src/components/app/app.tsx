import { connect, ConnectedProps } from 'react-redux';
import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import browserHistory from '../../browser-history';
import MainPage from '../main-page/main-page';
import AuthPage from '../auth-page/auth-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-fount-page';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { State } from '../../types/state';
import Loading from '../loading/loading';

const mapStateToProps = ({isLoading}: State) => ({
  isLoading,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const {
    isLoading,
  } = props;

  if (isLoading) {
    return <Loading />;
  }

  const favoritesPageRender = () => <FavoritesPage />;

  return (
    <BrowserRouter history={browserHistory}>
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
    </BrowserRouter>
  );
}

export { App };
export default connector(App);
