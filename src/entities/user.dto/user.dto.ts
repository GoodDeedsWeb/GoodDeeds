import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  name: string;

  @AutoMap()
  password: string;
}
