import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class FriendAddDto {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  UserId: string;

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  FriendId: string;
}
