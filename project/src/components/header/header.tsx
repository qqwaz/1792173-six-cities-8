import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logout } from '../../store/action';
import { getAuthInfo, getAuthStatus } from '../../store/service/selectors';

function Header(): JSX.Element {
  const authorizationStatus = useSelector(getAuthStatus);
  const authInfo = useSelector(getAuthInfo);
  const dispatch = useDispatch();
  const history = useHistory();

  const showNavigation = history.location.pathname !== AppRoute.Auth;
  const isAuthed = authorizationStatus === AuthorizationStatus.Auth;

  const onSignOut = () => {
    dispatch(logout());
  };

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
                {isAuthed
                  ? (
                    <>
                      <li className="header__nav-item user">
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                            <img src={authInfo?.avatarUrl} alt='Avatar' />
                          </div>
                          <span className="header__user-name user__name">{authInfo?.email}</span>
                        </Link>
                      </li>
                      <li className="header__nav-item">
                        <a className="header__nav-link" href="#">
                          <span className="header__signout" onClick={onSignOut}>Sign out</span>
                        </a>
                      </li>
                    </>)
                  : (
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to='/login'
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>)}
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}

export default Header;
