import { State } from '../types/state';
import { Actions, ActionType } from '../types/action';
import { DefaultCity, SortType } from '../const';
import { Offers } from '../mocks/offers';
import { getOffersByCity, sortOffers } from '../utils';

const initialState: State = {
  city: DefaultCity,
  offers: getOffersByCity(DefaultCity, Offers),
  sortType: SortType.Popular,
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
        offers: sortOffers(action.payload, state.sortType),
      };
    }
    case ActionType.ChangeSortType: {
      return {
        ...state,
        offers: sortOffers(state.offers, action.payload),
        sortType: action.payload,
      };
    }
    default:
      return state;
  }
};

export { reducer };
