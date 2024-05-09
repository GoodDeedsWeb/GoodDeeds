import { UserFriend } from 'src/entities/db_entities/user.friend';

export interface IUserFriendRepository {
  create(userFriend: UserFriend): Promise<boolean>;
  findUserFriend(userFriend: UserFriend): Promise<UserFriend | null>;
  delete(userFriend: UserFriend): Promise<boolean>;
}
