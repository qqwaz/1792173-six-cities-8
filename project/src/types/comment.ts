import { User, UserServer} from './user';

export type Comment = {
  id: number,
  user: User,
  rating: number,
  comment: string,
  date: Date,
};

export type CommentServer = {
  id: number,
  user: UserServer,
  rating: number,
  comment: string,
  date: Date,
};
