import React, { SyntheticEvent, useRef } from 'react';
import { Link, Redirect} from 'react-router-dom';
import Header from '../header/header';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/action';
import { checkPasswordConstrains, getRandomCity } from '../../utils';
import { getAuthStatus } from '../../store/service/selectors';

function AuthPage(): JSX.Element {
  const authorizationStatus = useSelector(getAuthStatus);
  const dispatch = useDispatch();

  const randomCity = getRandomCity();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.Main} />;
  }

  const formSubmitHandler = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null && checkPasswordConstrains(passwordRef.current.value)) {
      dispatch(login({
        login: emailRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={formSubmitHandler} >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required ref={emailRef} />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required ref={passwordRef} />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AuthPage;
