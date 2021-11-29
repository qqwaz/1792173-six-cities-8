import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import FavoritesLocations from '../favorites-locations/favorites-locations';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import { groupOffersByCity } from '../../utils';
import { AppRoute, AuthorizationStatus } from '../../const';
import { redirectToRoute } from '../../store/actions';
import { fetchFavorites } from '../../store/api-actions';
import { memo, useEffect } from 'react';
import { getFavorites } from '../../store/data/selectors';
import { getAuthStatus } from '../../store/service/selectors';

function FavoritesPage(): JSX.Element {
  const favorites = useSelector(getFavorites);
  const authorizationStatus = useSelector(getAuthStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    authorizationStatus === AuthorizationStatus.Auth
      ? dispatch(fetchFavorites())
      : dispatch(redirectToRoute(AppRoute.Auth));
  }, [authorizationStatus, dispatch]);

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

export default memo(FavoritesPage);
