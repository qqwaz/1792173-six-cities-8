import OfferNearPlaceCard from '../offer-near-place-card/offer-near-place-card';
import { getFakeData } from '../../utils/common';

function OfferNearPlaces(): JSX.Element {

  const places = getFakeData(3);

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">

          {places.map((x) =>
            <OfferNearPlaceCard key={x.id} />,
          )}

        </div>
      </section>
    </div>
  );
}

export default OfferNearPlaces;
