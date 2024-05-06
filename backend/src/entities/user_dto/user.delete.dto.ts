import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDeleteDto {
  // TODO: swap to id
  @IsNotEmpty()
  @IsEmail()
  @AutoMap()
  Email: string;
}
