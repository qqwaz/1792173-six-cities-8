import OfferReviewForm from '../offer-review-form/offer-review-form';
import Rating from '../rating/rating';
import { RatingComponentVariants } from '../../const';
import { getFakeData } from '../../utils';

function OfferReviews(): JSX.Element {

  const reviews = getFakeData(3);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((x) => (
          <li key={x.id} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar" />
              </div>
              <span className="reviews__user-name">
                Max
              </span>
            </div>
            <div className="reviews__info">
              <Rating variant={RatingComponentVariants.Review} value={3.2} />
              <p className="reviews__text">
                A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
              </p>
              <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
            </div>
          </li>
        ))}
      </ul>
      <OfferReviewForm />
    </section>
  );
}

export default OfferReviews;
