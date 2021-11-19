import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import { changeCity as changeCityState, getOffers as getOffersState } from '../../store/action';
import { Cities } from '../../const';
import { SyntheticEvent } from 'react';
import { City } from '../../types/city';
import { getOffersByCity } from '../../utils';

const mapStateToProps = ({ city, offers }: State) => ({
  city,
  offers,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      changeCity: changeCityState,
      getOffers: getOffersState,
    },
    dispatch,
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MainLocations(props: PropsFromRedux): JSX.Element {
  const {
    city,
    offers,
    changeCity,
    getOffers,
  } = props;

  const onClick = (newCity: City) => (e: SyntheticEvent) => {
    e.preventDefault();
    changeCity(newCity);
    getOffers(getOffersByCity(newCity, offers));
  };

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Cities.map((x) => (
              <li key={x.name} className="locations__item">
                <a className={`locations__item-link tabs__item ${x.name === city.name && 'tabs__item--active'}`} href="/"
                  onClick={onClick(x)}
                >
                  <span>{x.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export { MainLocations };
export default connector(MainLocations);
