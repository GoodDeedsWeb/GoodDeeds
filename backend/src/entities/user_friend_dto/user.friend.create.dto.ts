import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UserFriendCreateDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @AutoMap()
  UserId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @AutoMap()
  FriendId: number;
}
