import { AutoMap } from '@automapper/classes';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class GoodDeedDeleteDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @AutoMap()
  Id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @AutoMap()
  UserId: string;
}
