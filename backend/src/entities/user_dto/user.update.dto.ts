import { AutoMap } from '@automapper/classes';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  Id: string;

  @IsNotEmpty()
  @IsEmail()
  @AutoMap()
  Email: string;

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  Name: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 5,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 1,
  })
  @AutoMap()
  Password: string;
}
