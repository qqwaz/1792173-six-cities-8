import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import { ThunkAppDispatch } from './types/action';
import { checkAuth, fetchOffers, requireAuthorization } from './store/action';
import { AuthorizationStatus } from './const';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from './store/middlewares/redirect';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuth());
(store.dispatch as ThunkAppDispatch)(fetchOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
