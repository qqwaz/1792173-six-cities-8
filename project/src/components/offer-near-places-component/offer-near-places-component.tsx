import OfferNearPlaceCardComponent from '../offer-near-place-card-component/offer-near-place-card-component';
import { getFakeData } from '../../utils/common';

function OfferNearPlacesComponent(): JSX.Element {

  const places = getFakeData(3);

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">

          {places.map((x) =>
            <OfferNearPlaceCardComponent key={x.id} />,
          )}

        </div>
      </section>
    </div>
  );
}

export default OfferNearPlacesComponent;
