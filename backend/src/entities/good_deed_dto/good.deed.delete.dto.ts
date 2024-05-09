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
  @IsString()
  @MinLength(1)
  @AutoMap()
  UserId: string;
}
