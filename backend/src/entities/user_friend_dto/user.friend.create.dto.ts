import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserFriendCreateDto {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  FriendId: string;
}
