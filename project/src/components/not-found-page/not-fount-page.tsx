import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../header/header';
import { linkStyle } from './styles';

function NotFoundPage(): JSX.Element {
  return (

    <div className="page page--favorites-empty">
      <Header />
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Page not found</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">404: Page not found.</b>
              <Link className="favorites__status-description" to={AppRoute.Main}>
                <p style={linkStyle}>Go to the main page</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
