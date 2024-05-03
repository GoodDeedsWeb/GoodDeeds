import { AutoMap } from '@automapper/classes';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Min,
} from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @AutoMap()
  Id: number;

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
