import { AutoMap } from '@automapper/classes';

export class UserLoginDto {
  @AutoMap()
  name: string;

  @AutoMap()
  password: string;
}
