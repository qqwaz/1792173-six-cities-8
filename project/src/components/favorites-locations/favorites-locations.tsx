import { Link } from 'react-router-dom';
import PlaceCard from '../place-card/place-card';
import { AppRoute, PlaceCardComponentVariant } from '../../const';
import { getFakeData } from '../../utils';

function FavoritesLocations(): JSX.Element {

  const places = getFakeData(2);

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main}>
            <span>Amsterdam</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {places.map((x) =>
          <PlaceCard key={x.id} variant={PlaceCardComponentVariant.Favorites} />,
        )}
      </div>
    </li>
  );
}

export default FavoritesLocations;
