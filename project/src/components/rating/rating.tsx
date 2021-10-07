import { RatingComponentVariants } from '../../const';

type RatingProps = {
  variant: RatingComponentVariants,
  value: number,
}

function Rating(props: RatingProps): JSX.Element {
  const {
    variant,
    value,
  } = props;

  const starsFillWidth = `${Math.round(value) * 20}%`;

  const Prefix = {
    [RatingComponentVariants.PlaceCard]: 'place-card',
    [RatingComponentVariants.Review]: 'reviews',
    [RatingComponentVariants.Property]: 'property',
  };

  return (
    <div className={`${Prefix[variant]}__rating rating`}>
      <div className={`${Prefix[variant]}__stars rating__stars`}>
        <span style={{width: starsFillWidth}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {variant === RatingComponentVariants.Property &&
        <span className="property__rating-value rating__value">{value}</span>}
    </div>
  );
}

export default Rating;
