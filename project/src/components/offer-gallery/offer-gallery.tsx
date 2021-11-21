import { OfferImages } from '../../types/offer-images';
import { OFFER_GALLERY_PICTURES_MAX_AMOUNT } from '../../const';

type OfferGalleryProps = {
  pics: OfferImages,
}

function OfferGallery(props: OfferGalleryProps): JSX.Element {
  const {
    pics,
  } = props;

  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {pics.slice(0, OFFER_GALLERY_PICTURES_MAX_AMOUNT).map((pic) => (
          <div key={pic} className="property__image-wrapper">
            <img className="property__image" src={pic} alt="Studio" />
          </div>))}
      </div>
    </div>
  );
}

export default OfferGallery;
