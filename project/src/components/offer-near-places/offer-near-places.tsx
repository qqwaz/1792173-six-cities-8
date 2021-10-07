import PlaceCard from '../place-card/place-card';
import { PlaceCardComponentVariants } from '../../const';
import { getFakeData } from '../../utils';

function OfferNearPlaces(): JSX.Element {

  const places = getFakeData(3);

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {places.map((x) =>
            <PlaceCard key={x.id} variant={PlaceCardComponentVariants.NearPlace} />,
          )}
        </div>
      </section>
    </div>
  );
}

export default OfferNearPlaces;
