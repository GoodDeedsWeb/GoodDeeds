import { UserFriend } from 'src/entities/db_entities/user.friend';

export interface IUserFriendRepository {
  create(userFriend: UserFriend): Promise<boolean>;
  findByUserId(userId: number): Promise<UserFriend[] | null>;
  findUserFriend(userFriend: UserFriend): Promise<UserFriend | null>;
  delete(userFriend: UserFriend): Promise<boolean>;
}
