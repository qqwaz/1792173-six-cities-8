import { State } from '../types/state';
import { Actions, ActionType } from '../types/action';
import { DefaultCity, SortType } from '../const';
import { Offers } from '../mocks/offers';
import { getOffersByCity } from '../utils';

const initialState: State = {
  city: DefaultCity,
  offers: getOffersByCity(DefaultCity, Offers),
  sortType: SortType.Popular,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity: {
      return { ...state, city: action.payload };
    }
    case ActionType.GetOffers: {
      return { ...state, offers: action.payload };
    }
    default:
      return state;
  }
};

export { reducer };
