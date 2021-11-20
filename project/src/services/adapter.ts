import { Offer } from '../types/offer';
import { Comment } from '../types/comment';
import { AuthInfo } from '../types/authInfo';

export const adaptOffersToClient = (offers: any[]): Offer[] => offers
  .map(({
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
  }) => ({
    previewImage: previewImage,
    isFavorite: isFavorite,
    isPremium: isPremium,
    maxAdults: maxAdults,
    host: {
      isPro: isPro,
      avatarUrl: avatarUrl,
      ...restHost,
    },
    ...rest,
  }));


export const adaptCommentToClient = (comments: any[]): Comment[] => comments
  .map(({
    user: {
      is_pro: isPro,
      avatar_url: avatarUrl,
      ...restUser
    },
    ...rest
  }) => ({
    user: {
      isPro: isPro,
      avatarUrl: avatarUrl,
      ...restUser,
    },
    ...rest,
  }));

export const adaptAuthInfoToClient = (info: any): AuthInfo => ({
  avatarUrl: info.avatar_url,
  email: info.email,
  id: info.id,
  isPro: info.is_pro,
  name: info.name,
  token: info.token,
});
