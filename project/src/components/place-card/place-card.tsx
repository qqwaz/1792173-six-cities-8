import Rating from '../rating/rating';
import { RatingComponentVariant, PlaceCardComponentVariant } from '../../const';

type PlaceCardProps = {
  variant: PlaceCardComponentVariant,
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const {
    variant,
  } = props;

  const isPremium = true;

  const ArticleStyle = {
    [PlaceCardComponentVariant.Favorites]: 'favorites__card place-card',
    [PlaceCardComponentVariant.NearPlace]: 'near-places__card place-card',
    [PlaceCardComponentVariant.Main]: 'cities__place-card place-card',
  };

  const ImgWrapperStyle = {
    [PlaceCardComponentVariant.Favorites]: 'favorites__image-wrapper place-card__image-wrapper',
    [PlaceCardComponentVariant.NearPlace]: 'near-places__image-wrapper place-card__image-wrapper',
    [PlaceCardComponentVariant.Main]: 'cities__image-wrapper place-card__image-wrapper',
  };

  const InfoStyle = {
    [PlaceCardComponentVariant.Favorites]: 'favorites__card-info place-card__info',
    [PlaceCardComponentVariant.NearPlace]: 'place-card__info',
    [PlaceCardComponentVariant.Main]: 'place-card__info',
  };

  const ImgSize = {
    [PlaceCardComponentVariant.Favorites]: {
      width: 150,
      height: 110,
    },
    [PlaceCardComponentVariant.NearPlace]: {
      width: 260,
      height: 200,
    },
    [PlaceCardComponentVariant.Main]: {
      width: 260,
      height: 200,
    },
  };

  return (
    <article className={ArticleStyle[variant]}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={ImgWrapperStyle[variant]}>
        <a href="/">
          <img className="place-card__image" src="img/room.jpg" width={ImgSize[variant].width} height={ImgSize[variant].height} alt="Place" />
        </a>
      </div>
      <div className={InfoStyle[variant]}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;80</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <Rating variant={RatingComponentVariant.PlaceCard} value={3.6} />
        <h2 className="place-card__name">
          <a href="/">Wood and stone place</a>
        </h2>
        <p className="place-card__type">Private room</p>
      </div>
    </article>
  );
}

export default PlaceCard;
