import { connect, ConnectedProps } from 'react-redux';
import OfferReviewForm from '../offer-review-form/offer-review-form';
import Rating from '../rating/rating';
import { RatingComponentVariant, AuthorizationStatus } from '../../const';
import { dateToMonth, dateToDay } from '../../utils';
import { State } from '../../types/state';

const mapStateToProps = ({reviews, authorizationStatus}: State) => ({
  reviews,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function OfferReviews(props: PropsFromRedux): JSX.Element {
  const {
    reviews,
    authorizationStatus,
  } = props;

  const isAuthed = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((x) => (
          <li key={x.id} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={x.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
              </div>
              <span className="reviews__user-name">
                {x.user.name}
              </span>
            </div>
            <div className="reviews__info">
              <Rating variant={RatingComponentVariant.Review} value={x.rating} />
              <p className="reviews__text">
                {x.comment}
              </p>
              <time className="reviews__time" dateTime={dateToDay(x.date)}>{dateToMonth(x.date)}</time>
            </div>
          </li>
        ))}
      </ul>
      {isAuthed &&
        <OfferReviewForm />}
    </section>
  );
}

export { OfferReviews };
export default connector(OfferReviews);
