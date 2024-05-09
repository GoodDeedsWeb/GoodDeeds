import { AutoMap } from '@automapper/classes';

export class FriendSearchDto {
  @AutoMap()
  UserId: string;

  @AutoMap()
  FriendId: string;
}
