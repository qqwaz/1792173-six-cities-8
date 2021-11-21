import { State } from '../types/state';
import { Actions, ActionType } from '../types/action';
import { DefaultCity, SortType, AuthorizationStatus } from '../const';

const initialState: State = {
  city: DefaultCity,
  offers: [],
  favorites: [],
  nearbies: [],
  sortType: SortType.Popular,
  reviews: [],
  isLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
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
    case ActionType.GetFavorites: {
      return {
        ...state,
        favorites: action.payload,
      };
    }
    case ActionType.GetNearbies: {
      return {
        ...state,
        nearbies: action.payload,
      };
    }
    case ActionType.GetCurrentOffer: {
      return {
        ...state,
        currentOffer: action.payload,
      };
    }
    case ActionType.GetReviews: {
      return {
        ...state,
        reviews: action.payload,
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
    case ActionType.GetAuthInfo:
      return {
        ...state,
        authInfo: action.payload,
      };

    default:
      return state;
  }
};

export { reducer };
