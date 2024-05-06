import { AutoMap } from '@automapper/classes';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserUpdateDto {
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
    minUppercase: 2,
    minNumbers: 2,
  })
  @AutoMap()
  Password: string;
}
