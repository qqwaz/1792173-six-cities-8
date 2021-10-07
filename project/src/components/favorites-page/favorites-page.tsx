import Header from '../header/header';
import FavoritesLocations from '../favorites-locations/favorites-locations';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import { getFakeData } from '../../utils';

function FavoritesPage(): JSX.Element {

  const locations = getFakeData(3);

  const isEmpty = false;

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
                  {locations.map((x) =>
                    <FavoritesLocations key={x.id} />,
                  )}
                </ul>
              </section>
            </div>
          </main>
        )}
      <footer className="footer container">
        <a className="footer__logo-link" href="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
