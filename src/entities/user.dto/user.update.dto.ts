import { AutoMap } from '@automapper/classes';

export class UserUpdateDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  password: string;
}
