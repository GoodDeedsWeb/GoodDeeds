import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDeleteDto {
  // TODO: swap to id
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  Name: string;
}
