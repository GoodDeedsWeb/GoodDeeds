/* eslint-disable prettier/prettier */
import { Result } from 'src/entities/result';
import { UserFriendCreateDto } from 'src/entities/user_friend_dto/user.friend.create.dto';
import { UserFriendDeleteDto } from 'src/entities/user_friend_dto/user.friend.delete.dto';
import { UserFriendDto } from 'src/entities/user_friend_dto/user.friend.dto';
import { UserFriendSearchDto } from 'src/entities/user_friend_dto/user.friend.search.dto';

export interface IUserFriendService {
  createUserFriend(userFriendCreateDto: UserFriendCreateDto, userId: string): Promise<Result>;
  findByUserId(userId: string): Promise<UserFriendDto[] | null>;
  isFriendship(userFriendSearch: UserFriendSearchDto): Promise<boolean>;
  deleteUserFriend(userFriendDeleteDto: UserFriendDeleteDto, userId: string): Promise<Result>;
}
