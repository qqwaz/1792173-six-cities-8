import React, { memo, SyntheticEvent, useRef } from 'react';
import { Redirect} from 'react-router-dom';
import Header from '../header/header';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useSelector, useDispatch } from 'react-redux';
import { changeCity, redirectToRoute } from '../../store/actions';
import { login } from '../../store/api-actions';
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

  const onClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(changeCity(randomCity));
    dispatch(redirectToRoute(AppRoute.Main));
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
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input id="email" data-testid="email" className="login__input form__input" type="email" name="email" placeholder="Email" required ref={emailRef} />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input id="password" data-testid="password" className="login__input form__input" type="password" name="password" placeholder="Password" required ref={passwordRef} />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#" onClick={onClick}>
                <span>{randomCity.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default memo(AuthPage);
