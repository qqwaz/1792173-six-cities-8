import HeaderComponent from '../header-component/header-component';
import FavoritesLocationsComponent from '../favorites-locations-component/favorites-locations-component';
import { getFakeData } from '../../utils/common';

function FavoritesPage(): JSX.Element {

  const locations = getFakeData(3);

  return (
    <div className="page">
      <HeaderComponent />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {locations.map((x) =>
                <FavoritesLocationsComponent key={x.id} />
                )}

            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
