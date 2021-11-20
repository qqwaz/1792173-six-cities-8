import { State } from '../types/state';
import { Actions, ActionType } from '../types/action';
import { DefaultCity, SortType, AuthorizationStatus } from '../const';

const initialState: State = {
  city: DefaultCity,
  offers: [],
  favorites: [],
  sortType: SortType.Popular,
  isLoading: true,
  authorizationStatus: AuthorizationStatus.NoAuth,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity: {
      return {
        ...state,
        city: action.payload,
        sortType: SortType.Popular,
      };
    }
    case ActionType.GetOffers: {
      return {
        ...state,
        offers: action.payload,
        isLoading: false,
      };
    }
    case ActionType.ChangeSortType: {
      return {
        ...state,
        sortType: action.payload,
      };
    }
    case ActionType.Loading: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.RequireLogout:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };

    default:
      return state;
  }
};

export { reducer };
