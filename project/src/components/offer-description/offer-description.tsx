import { SyntheticEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { ThunkAppDispatch } from '../../types/action';
import { postFavorite, redirectToRoute } from '../../store/action';
import { AppRoute, AuthorizationStatus, RatingComponentVariant } from '../../const';
import Rating from '../rating/rating';
import { Offer } from '../../types/offer.js';
import { State } from '../../types/state';

type OfferDescriptionProps = {
  offer: Offer,
}

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) =>
  bindActionCreators(
    {
      setFavorite: postFavorite,
      redirect: redirectToRoute,
    },
    dispatch,
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & OfferDescriptionProps;

function OfferDescription(props: ConnectedComponentProps): JSX.Element {
  const {
    offer,
    authorizationStatus,
    setFavorite,
    redirect,
  } = props;

  const isFavoriteStyle = offer.isFavorite ? 'property__bookmark-button--active' : '';
  const isProStyle = offer.host.isPro ? 'property__avatar-wrapper--pro' : '';

  const onClick = (e: SyntheticEvent) => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      redirect(AppRoute.Auth);
      return;
    }
    setFavorite(offer.id.toString(), Number(!offer.isFavorite).toString());
  };

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
        <button className={`property__bookmark-button button ${isFavoriteStyle}`} type="button" onClick={onClick}>
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

export { OfferDescription };
export default connector(OfferDescription);
