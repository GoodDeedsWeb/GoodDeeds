import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  Name: string;

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  Password: string;
}
