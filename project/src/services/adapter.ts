import { Offer, OfferServer } from '../types/offer';
import { Comment, CommentServer } from '../types/comment';
import { AuthInfo, AuthInfoServer } from '../types/auth-info';
import { sortReviews } from '../utils';
import { REVIEWS_MAX_AMOUNT, OfferType } from '../const';

export const adaptOfferToClient = (offer: OfferServer): Offer => {
  const {
    preview_image: previewImage,
    is_favorite: isFavorite,
    is_premium: isPremium,
    max_adults: maxAdults,
    type,
    host: {
      is_pro: isPro,
      avatar_url: avatarUrl,
      ...restHost
    },
    ...rest
  } = offer;
  return ({
    previewImage,
    isFavorite,
    isPremium,
    maxAdults,
    type: type as OfferType,
    host: {
      isPro,
      avatarUrl,
      ...restHost,
    },
    ...rest,
  });
};

export const adaptOffersToClient = (offers: OfferServer[]): Offer[] => offers.map(adaptOfferToClient);

export const adaptCommentToClient = (comment: CommentServer): Comment => {
  const {
    user: {
      is_pro: isPro,
      avatar_url: avatarUrl,
      ...restUser
    },
    date,
    ...rest
  } = comment;
  return ({
    user: {
      isPro: isPro,
      avatarUrl: avatarUrl,
      ...restUser,
    },
    date: new Date(date),
    ...rest,
  });
};

export const adaptCommentsToClient = (comments: CommentServer[]): Comment[] =>
  sortReviews(comments.map(adaptCommentToClient)).slice(0, REVIEWS_MAX_AMOUNT);

export const adaptAuthInfoToClient = (info: AuthInfoServer): AuthInfo => ({
  avatarUrl: info.avatar_url,
  email: info.email,
  id: info.id,
  isPro: info.is_pro,
  name: info.name,
  token: info.token,
});
