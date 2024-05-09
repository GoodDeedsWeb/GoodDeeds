import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class FriendDeleteDto {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  UserId: string;

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  FriendId: string;
}
