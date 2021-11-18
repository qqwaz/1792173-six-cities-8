import PlaceCard from '../place-card/place-card';
import { PlaceCardComponentVariant } from '../../const';
import { Offer } from '../../types/offer';

type OfferNearPlacesProps = {
  offers: Offer[],
}

function OfferNearPlaces(props: OfferNearPlacesProps): JSX.Element {
  const {
    offers,
  } = props;

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offers.map((offer) =>
            <PlaceCard key={offer.id} variant={PlaceCardComponentVariant.NearPlace} offer={offer} />,
          )}
        </div>
      </section>
    </div>
  );
}

export default OfferNearPlaces;
