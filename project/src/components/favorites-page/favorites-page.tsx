import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Header from '../header/header';
import FavoritesLocations from '../favorites-locations/favorites-locations';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import { groupOffersByCity } from '../../utils';
import { AppRoute, AuthorizationStatus } from '../../const';
import { fetchFavorites } from '../../store/action';
import { useEffect } from 'react';
import { getFavorites } from '../../store/data/selectors';
import { getAuthStatus } from '../../store/service/selectors';

function FavoritesPage(): JSX.Element {
  const favorites = useSelector(getFavorites);
  const authorizationStatus = useSelector(getAuthStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavorites());
    }
  }, [authorizationStatus, dispatch]);

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.Auth} />;
  }

  const isEmpty = !favorites.length;

  const locations = groupOffersByCity(favorites);

  return (
    <div className="page">
      <Header />
      {isEmpty
        ? <FavoritesEmpty />
        : (
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.entries(locations).map((location) => (
                    <FavoritesLocations key={location[0]} location={location} />
                  ))}
                </ul>
              </section>
            </div>
          </main>
        )}
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
