import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserFriendDeleteDto {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  FriendId: string;
}
