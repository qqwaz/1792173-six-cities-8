import { RatingComponentVariant } from '../../const';
import { calcStarsStyle } from '../../utils';

type RatingProps = {
  variant: RatingComponentVariant,
  value: number,
}

function Rating(props: RatingProps): JSX.Element {
  const {
    variant,
    value,
  } = props;

  const starsStyle = calcStarsStyle(value);

  const Prefix = {
    [RatingComponentVariant.PlaceCard]: 'place-card',
    [RatingComponentVariant.Review]: 'reviews',
    [RatingComponentVariant.Property]: 'property',
  };

  return (
    <div className={`${Prefix[variant]}__rating rating`}>
      <div className={`${Prefix[variant]}__stars rating__stars`}>
        <span style={starsStyle}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {variant === RatingComponentVariant.Property &&
        <span className="property__rating-value rating__value">{value}</span>}
    </div>
  );
}

export default Rating;
