import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  Name: string;

  @AutoMap()
  Password: string;
}
