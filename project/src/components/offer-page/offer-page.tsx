import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../header/header';
import OfferGallery from '../offer-gallery/offer-gallery';
import OfferNearPlaces from '../offer-near-places/offer-near-places';
import OfferReviews from '../offer-reviews/offer-reviews';
import OfferDescription from '../offer-description/offer-description';
import Map from '../map/map';
import { MapComponentVariant } from '../../const';
import { fetchNearbiesById, fetchOfferById, fetchReviewsById } from '../../store/action';
import Loading from '../loading/loading';
import { getCurrentOffer, getNearbies } from '../../store/data/selectors';

function OfferPage(): JSX.Element {
  const currentOffer = useSelector(getCurrentOffer);
  const nearbies = useSelector(getNearbies);
  const dispatch = useDispatch();

  const { id } = useParams<{id: string}>();

  useEffect(() => {
    dispatch(fetchOfferById(id));
    dispatch(fetchNearbiesById(id));
    dispatch(fetchReviewsById(id));
  }, [id, dispatch]);

  if (currentOffer?.id.toString() !== id) {
    return <Loading />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <OfferGallery pics={currentOffer.images} />
          <div className="property__container container">
            <div className="property__wrapper">
              <OfferDescription offer={currentOffer} />
              <OfferReviews />
            </div>
          </div>
          <Map
            variant={MapComponentVariant.Offer}
            activeOfferId={currentOffer.id}
            offers={[...nearbies, currentOffer]}
            city={currentOffer.city}
          />
        </section>
        <OfferNearPlaces offers={nearbies} />
      </main>
    </div>
  );
}

export default memo(OfferPage);
