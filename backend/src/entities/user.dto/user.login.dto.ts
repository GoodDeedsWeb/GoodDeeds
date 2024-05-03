import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  name: string;

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  password: string;
}
