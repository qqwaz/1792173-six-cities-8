import FavoritesPlaceCard from '../favorites-place-card/favorites-place-card';
import { getFakeData } from '../../utils/common';

function FavoritesLocations(): JSX.Element {

  const places = getFakeData(5);

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>Amsterdam</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">

        {places.map((x) =>
          <FavoritesPlaceCard key={x.id} />,
        )}
      </div>
    </li>
  );
}

export default FavoritesLocations;
