import { AutoMap } from '@automapper/classes';

export class UserCreateDto {
  @AutoMap()
  name: string;

  @AutoMap()
  password: string;
}
