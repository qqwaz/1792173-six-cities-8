import { Cities } from '../../const';

function MainLocations(): JSX.Element {

  const currentCity = 2;

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Cities.map((x, i) => (
              <li key={x.name} className="locations__item">
                <a className={`locations__item-link tabs__item ${i === currentCity && 'tabs__item--active'}`} href="/">
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

export default MainLocations;
