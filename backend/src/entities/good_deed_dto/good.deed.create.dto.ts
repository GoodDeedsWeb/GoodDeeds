import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class GoodDeedCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @AutoMap()
  GoodDeed: string;
}
