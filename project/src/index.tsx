import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import { requireAuthorization } from './store/action';
import { AuthorizationStatus } from './const';
import { ThunkAppDispatch } from './types/action';
import { fetchOffersAction } from './store/action';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
