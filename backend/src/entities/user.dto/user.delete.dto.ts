import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDeleteDto {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  name: string;
}
