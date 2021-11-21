import { Offer } from '../types/offer';
import { Comment } from '../types/comment';
import { AuthInfo } from '../types/auth-info';

export const adaptOfferToClient = (offer: any): Offer => {
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

export const adaptOffersToClient = (offers: any[]): Offer[] => offers.map(adaptOfferToClient);

export const adaptCommentToClient = (comment: any): Comment => {
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

export const adaptCommentsToClient = (comments: any[]): Comment[] => comments.map(adaptCommentToClient);

export const adaptAuthInfoToClient = (info: any): AuthInfo => ({
  avatarUrl: info.avatar_url,
  email: info.email,
  id: info.id,
  isPro: info.is_pro,
  name: info.name,
  token: info.token,
});
