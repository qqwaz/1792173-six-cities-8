export type User = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

export type UserServer = {
  id: number;
  name: string;
  'is_pro': boolean;
  'avatar_url': string;
};
