import PlaceCard from '../place-card/place-card';
import { PlaceCardComponentVariants } from '../../const';
import { getFakeData } from '../../utils';

function FavoritesLocations(): JSX.Element {

  const places = getFakeData(2);

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
          <PlaceCard key={x.id} variant={PlaceCardComponentVariants.Favorites} />,
        )}
      </div>
    </li>
  );
}

export default FavoritesLocations;
