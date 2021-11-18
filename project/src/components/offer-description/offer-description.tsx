import { RatingComponentVariant } from '../../const';
import Rating from '../rating/rating';
import { Offer } from '../../types/offer.js';

type OfferDescriptionProps = {
  offer: Offer,
}

function OfferDescription(props: OfferDescriptionProps): JSX.Element {
  const {
    offer,
  } = props;

  const isFavoriteStyle = offer.isFavorite ? 'property__bookmark-button--active' : '';
  const isProStyle = offer.host.isPro ? 'property__avatar-wrapper--pro' : '';

  return (
    <>
      {offer.isPremium &&
        <div className="property__mark">
          <span>Premium</span>
        </div>}
      <div className="property__name-wrapper">
        <h1 className="property__name">
          {offer.title}
        </h1>
        <button className={`property__bookmark-button button ${isFavoriteStyle}`} type="button">
          <svg className="property__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <Rating variant={RatingComponentVariant.Property} value={offer.rating} />
      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {offer.type}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {offer.bedrooms}
        </li>
        <li className="property__feature property__feature--adults">
          {offer.maxAdults}
        </li>
      </ul>
      <div className="property__price">
        <b className="property__price-value">&euro;{offer.price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>
      <div className="property__inside">
        <h2 className="property__inside-title">What&apos;s inside</h2>
        <ul className="property__inside-list">
          {offer.goods.map((x) => (
            <li key={x} className="property__inside-item">
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="property__host">
        <h2 className="property__host-title">Meet the host</h2>
        <div className="property__host-user user">
          <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
            <img className={`property__avatar user__avatar ${isProStyle}`} src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
          </div>
          <span className="property__user-name">
            {offer.host.name}
          </span>
          {offer.host.isPro &&
            <span className="property__user-status">
              Pro
            </span>}
        </div>
        <div className="property__description">
          <p className="property__text">
            {offer.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default OfferDescription;
