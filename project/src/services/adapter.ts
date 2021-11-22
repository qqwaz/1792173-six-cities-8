import { Offer, OfferServer } from '../types/offer';
import { Comment, CommentServer } from '../types/comment';
import { AuthInfo, AuthInfoServer } from '../types/auth-info';

export const adaptOfferToClient = (offer: OfferServer): Offer => {
  const {
    preview_image: previewImage,
    is_favorite: isFavorite,
    is_premium: isPremium,
    max_adults: maxAdults,
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
    ...rest
  } = comment;
  return ({
    user: {
      isPro: isPro,
      avatarUrl: avatarUrl,
      ...restUser,
    },
    ...rest,
  });
};

export const adaptCommentsToClient = (comments: CommentServer[]): Comment[] => comments.map(adaptCommentToClient);

export const adaptAuthInfoToClient = (info: AuthInfoServer): AuthInfo => ({
  avatarUrl: info.avatar_url,
  email: info.email,
  id: info.id,
  isPro: info.is_pro,
  name: info.name,
  token: info.token,
});
