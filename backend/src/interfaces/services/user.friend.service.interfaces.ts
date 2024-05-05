import { Result } from 'src/entities/result';
import { UserFriendCreateDto } from 'src/entities/user_friend_dto/user.friend.create.dto';
import { UserFriendDeleteDto } from 'src/entities/user_friend_dto/user.friend.delete.dto';
import { UserFriendDto } from 'src/entities/user_friend_dto/user.friend.dto';

export interface IUserFriendService {
  createUserFriend(userFriendCreateDto: UserFriendCreateDto): Promise<Result>;
  findByUserId(userId: number): Promise<UserFriendDto[] | null>;
  deleteUserFriend(userFriendDeleteDto: UserFriendDeleteDto): Promise<Result>;
}
