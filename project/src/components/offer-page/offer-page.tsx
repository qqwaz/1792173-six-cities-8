import { useRouteMatch, Redirect } from 'react-router-dom';
import Header from '../header/header';
import OfferGallery from '../offer-gallery/offer-gallery';
import OfferNearPlaces from '../offer-near-places/offer-near-places';
import OfferReviews from '../offer-reviews/offer-reviews';
import OfferDescription from '../offer-description/offer-description';
import Map from '../map/map';
import { Offer } from '../../types/offer';
import { getOffer } from '../../utils';
import { AppRoute, MapComponentVariant } from '../../const';

type OfferPageProps = {
  offers: Offer[],
}

type MatchParams = {
  id: string,
}

function OfferPage(props: OfferPageProps): JSX.Element {
  const {
    offers,
  } = props;

  const match = useRouteMatch<MatchParams>();
  const offerId = match.params.id;
  const offer = getOffer(offerId);

  if (!offer) {
    return <Redirect to={AppRoute.NotFound} />;
  }

  const nearest = offers.slice(0, 3);

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
          <Map variant={MapComponentVariant.Offer} location={offer.city.location} offers={nearest} activeOfferId={offer.id}/>
        </section>
        <OfferNearPlaces offers={nearest} />
      </main>
    </div>
  );
}

export default OfferPage;
