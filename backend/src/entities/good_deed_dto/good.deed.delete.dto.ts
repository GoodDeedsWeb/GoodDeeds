import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class GoodDeedDeleteDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @AutoMap()
  Id: number;
}
