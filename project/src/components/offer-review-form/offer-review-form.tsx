import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postReview } from '../../store/api-actions';
import { Rating, MIN_REVIEW_COMMENT_LENGTH, MAX_REVIEW_COMMENT_LENGTH } from '../../const';
import { getCurrentOffer } from '../../store/data/selectors';
import { getIsSending } from '../../store/service/selectors';

function OfferReviewForm(): JSX.Element {
  const currentOffer = useSelector(getCurrentOffer);
  const isDisabled = useSelector(getIsSending);
  const dispatch = useDispatch();

  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });

  const ratingChangeHandler = (rate: number) => () => {
    setReview({...review, rating: rate});
  };

  const commentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview({...review, comment: e.target.value});
  };

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentOffer) {
      return;
    }
    await dispatch(postReview(currentOffer.id.toString(), review.comment, review.rating));
    setReview({rating: 0, comment: ''});
  };

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={formSubmitHandler}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Rating.map(({rate, title}) => (
          <React.Fragment key={rate}>
            <input className="form__rating-input visually-hidden" name="rating" value={rate} id={`${rate}-stars`} type="radio"
              onChange={ratingChangeHandler(rate)}
              checked={rate === review.rating}
              disabled={isDisabled}
            />
            <label htmlFor={`${rate}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea minLength={MIN_REVIEW_COMMENT_LENGTH} maxLength={MAX_REVIEW_COMMENT_LENGTH} value={review.comment}
        onChange={commentChangeHandler}
        className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit"
          disabled={(review.comment.length < MIN_REVIEW_COMMENT_LENGTH) || (review.rating === 0) || isDisabled}
        >
            Submit
        </button>
      </div>
    </form>
  );
}

export default OfferReviewForm;
