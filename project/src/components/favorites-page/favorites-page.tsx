import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import FavoritesLocations from '../favorites-locations/favorites-locations';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import { groupOffersByCity } from '../../utils';
import { AppRoute } from '../../const';
import { State } from '../../types/state';

const mapStateToProps = ({favorites}: State) => ({
  favorites,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FavoritesPage(props: PropsFromRedux): JSX.Element {
  const {
    favorites,
  } = props;

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
