import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @AutoMap()
  Email: string;

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  Password: string;
}
