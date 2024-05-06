import { AutoMap } from '@automapper/classes';

export class UserFriendSearchDto {
  @AutoMap()
  UserId: string;

  @AutoMap()
  FriendId: string;
}
