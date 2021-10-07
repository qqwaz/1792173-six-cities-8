import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

function Header(): JSX.Element {

  const currentAuthorizationStatus = AuthorizationStatus.Auth;
  const currentLocation: string = AppRoute.Main;

  const showNavigation = currentLocation !== AppRoute.Auth;
  const isAuthed = currentAuthorizationStatus === AuthorizationStatus.Auth;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {showNavigation &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    {isAuthed
                      ? <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      : <span className="header__login">Sign in</span>}
                  </Link>
                </li>
                {isAuthed &&
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="/">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>}
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}

export default Header;
