import { useDispatch, useSelector } from 'react-redux';
import { changeCity } from '../../store/actions';
import { Cities } from '../../const';
import { memo, SyntheticEvent } from 'react';
import { City } from '../../types/city';
import { getCity } from '../../store/data/selectors';

function MainLocations(): JSX.Element {
  const city = useSelector(getCity);
  const dispatch = useDispatch();

  const onClick = (newCity: City) => (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(changeCity(newCity));
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

export default memo(MainLocations);
