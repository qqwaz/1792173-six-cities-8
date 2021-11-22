import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router';
import { bindActionCreators } from '@reduxjs/toolkit';
import { ThunkAppDispatch } from '../../types/action';
import Header from '../header/header';
import OfferGallery from '../offer-gallery/offer-gallery';
import OfferNearPlaces from '../offer-near-places/offer-near-places';
import OfferReviews from '../offer-reviews/offer-reviews';
import OfferDescription from '../offer-description/offer-description';
import Map from '../map/map';
import { MapComponentVariant } from '../../const';
import { fetchNearbiesById, fetchOfferById, fetchReviewsById } from '../../store/action';
import { State } from '../../types/state';
import Loading from '../loading/loading';

const mapStateToProps = ({currentOffer, nearbies}: State) => ({
  currentOffer,
  nearbies,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) =>
  bindActionCreators(
    {
      getCurrentOffer: fetchOfferById,
      getNearbies: fetchNearbiesById,
      getReviews: fetchReviewsById,
    },
    dispatch,
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function OfferPage(props: PropsFromRedux): JSX.Element {
  const {
    currentOffer,
    nearbies,
    getCurrentOffer,
    getNearbies,
    getReviews,
  } = props;

  const { id } = useParams<{id: string}>();

  useEffect(() => {
    getCurrentOffer(id);
    getNearbies(id);
    getReviews(id);
  }, [id, getCurrentOffer, getNearbies, getReviews]);

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
          />
        </section>
        <OfferNearPlaces offers={nearbies} />
      </main>
    </div>
  );
}

export { OfferPage };
export default connector(OfferPage);
