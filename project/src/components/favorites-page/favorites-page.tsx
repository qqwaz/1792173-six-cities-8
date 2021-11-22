import { connect, ConnectedProps } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from '@reduxjs/toolkit';
import Header from '../header/header';
import FavoritesLocations from '../favorites-locations/favorites-locations';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import { groupOffersByCity } from '../../utils';
import { AppRoute, AuthorizationStatus } from '../../const';
import { ThunkAppDispatch } from '../../types/action';
import { State } from '../../types/state';
import { fetchFavorites } from '../../store/action';
import { useEffect } from 'react';

const mapStateToProps = ({favorites, authorizationStatus}: State) => ({
  favorites,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) =>
  bindActionCreators(
    {
      getFavorites: fetchFavorites,
    },
    dispatch,
  );
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FavoritesPage(props: PropsFromRedux): JSX.Element {
  const {
    favorites,
    authorizationStatus,
    getFavorites,
  } = props;

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      getFavorites();
    }
  }, [authorizationStatus, getFavorites]);

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

export { FavoritesPage };
export default connector(FavoritesPage);
