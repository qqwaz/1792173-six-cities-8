import { Link } from 'react-router-dom';
import PlaceCard from '../place-card/place-card';
import { AppRoute, PlaceCardComponentVariant } from '../../const';
import { Offer } from '../../types/offer';

type FavoritesLocationsProps = {
  location: [string, Offer[]],
}

function FavoritesLocations(props: FavoritesLocationsProps): JSX.Element {
  const [
    city,
    offers
  ] = props.location;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <PlaceCard key={offer.id} variant={PlaceCardComponentVariant.Favorites} offer={offer} />
        ))}
      </div>
    </li>
  );
}

export default FavoritesLocations;
