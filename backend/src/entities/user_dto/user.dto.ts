import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  Id: string;

  @AutoMap()
  Email: string;

  @AutoMap()
  Name: string;
}
