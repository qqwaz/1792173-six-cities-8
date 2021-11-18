import PlaceCard from '../place-card/place-card';
import { PlaceCardComponentVariant } from '../../const';
import { Offers } from '../../mocks/offers';

type OfferNearPlacesProps = {
  offerId: string,
}

function OfferNearPlaces(props: OfferNearPlacesProps): JSX.Element {
  const {
    offerId,
  } = props;

  const places = Offers.slice(0, 3);

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {places.map((offer) =>
            <PlaceCard key={offer.id} variant={PlaceCardComponentVariant.NearPlace} offer={offer} />,
          )}
        </div>
      </section>
    </div>
  );
}

export default OfferNearPlaces;
