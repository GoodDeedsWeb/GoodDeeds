import { AutoMap } from '@automapper/classes';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class GoodDeedUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @AutoMap()
  Id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @AutoMap()
  GoodDeed: string;
}
