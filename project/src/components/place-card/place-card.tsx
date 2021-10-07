import Rating from '../rating/rating';
import { RatingComponentVariants, PlaceCardComponentVariants } from '../../const';

type PlaceCardProps = {
  variant: PlaceCardComponentVariants,
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const {
    variant,
  } = props;

  const isPremium = true;

  const ArticleStyle = {
    [PlaceCardComponentVariants.Favorites]: 'favorites__card place-card',
    [PlaceCardComponentVariants.NearPlace]: 'near-places__card place-card',
    [PlaceCardComponentVariants.Main]: 'cities__place-card place-card',
  };

  const ImgWrapperStyle = {
    [PlaceCardComponentVariants.Favorites]: 'favorites__image-wrapper place-card__image-wrapper',
    [PlaceCardComponentVariants.NearPlace]: 'near-places__image-wrapper place-card__image-wrapper',
    [PlaceCardComponentVariants.Main]: 'cities__image-wrapper place-card__image-wrapper',
  };

  const InfoStyle = {
    [PlaceCardComponentVariants.Favorites]: 'favorites__card-info place-card__info',
    [PlaceCardComponentVariants.NearPlace]: 'place-card__info',
    [PlaceCardComponentVariants.Main]: 'place-card__info',
  };

  const ImgSize = {
    [PlaceCardComponentVariants.Favorites]: {
      width: 150,
      height: 110,
    },
    [PlaceCardComponentVariants.NearPlace]: {
      width: 260,
      height: 200,
    },
    [PlaceCardComponentVariants.Main]: {
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
        <Rating variant={RatingComponentVariants.PlaceCard} value={3.6} />
        <h2 className="place-card__name">
          <a href="/">Wood and stone place</a>
        </h2>
        <p className="place-card__type">Private room</p>
      </div>
    </article>
  );
}

export default PlaceCard;
