import { AutoMap } from '@automapper/classes';
import { IsString, MinLength } from 'class-validator';

export class GoodDeedDeleteDto {
  @IsString()
  @MinLength(4)
  @AutoMap()
  GoodDeed: string;
}
