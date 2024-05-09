/* eslint-disable prettier/prettier */
import { Result } from 'src/entities/result';
import { FriendAddDto } from 'src/entities/user_friend_dto/friend.add.dto';
import { FriendDeleteDto } from 'src/entities/user_friend_dto/friend.delete.dto';
import { FriendSearchDto } from 'src/entities/user_friend_dto/friend.search.dto';

export interface IUserFriendService {
  createUserFriend(userFriendCreateDto: FriendAddDto): Promise<Result>;
  isFriendship(userFriendSearch: FriendSearchDto): Promise<boolean>;
  deleteUserFriend(userFriendDeleteDto: FriendDeleteDto): Promise<Result>;
}
