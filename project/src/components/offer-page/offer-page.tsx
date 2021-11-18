import { useRouteMatch, Redirect } from 'react-router-dom';
import Header from '../header/header';
import OfferGallery from '../offer-gallery/offer-gallery';
import OfferNearPlaces from '../offer-near-places/offer-near-places';
import OfferReviews from '../offer-reviews/offer-reviews';
import OfferDescription from '../offer-description/offer-description';
import { getOffer } from '../../utils';
import { AppRoute } from '../../const';

type MatchParams = {
  id: string,
}

function OfferPage(): JSX.Element {
  const match = useRouteMatch<MatchParams>();
  const offerId = match.params.id;
  const offer = getOffer(offerId);

  if (!offer) {
    return <Redirect to={AppRoute.NotFound} />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <OfferGallery pics={offer.images} />
          <div className="property__container container">
            <div className="property__wrapper">
              <OfferDescription offer={offer} />
              <OfferReviews offerId={offerId} />
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <OfferNearPlaces offerId={offerId} />
      </main>
    </div>
  );
}

export default OfferPage;
