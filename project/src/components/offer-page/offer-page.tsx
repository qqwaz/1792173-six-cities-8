import Header from '../header/header';
import OfferGallery from '../offer-gallery/offer-gallery';
import OfferNearPlaces from '../offer-near-places/offer-near-places';
import OfferReviews from '../offer-reviews/offer-reviews';
import OfferDescription from '../offer-description/offer-description';

function OfferPage(): JSX.Element {
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <OfferGallery />
          <div className="property__container container">
            <div className="property__wrapper">
              <OfferDescription />
              <OfferReviews />
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <OfferNearPlaces />
      </main>
    </div>
  );
}

export default OfferPage;
