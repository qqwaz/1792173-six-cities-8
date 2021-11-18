import { Link } from 'react-router-dom';
import Header from '../header/header';
import FavoritesLocations from '../favorites-locations/favorites-locations';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import { Offer } from '../../types/offer';
import { groupOffersByCity } from '../../utils';
import { AppRoute } from '../../const';

type FavoritesPageProps = {
  offers: Offer[],
}

function FavoritesPage(props: FavoritesPageProps): JSX.Element {
  const {
    offers,
  } = props;

  const isEmpty = !offers.length;

  const locations = groupOffersByCity(offers);

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
