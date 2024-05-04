import { AutoMap } from '@automapper/classes';

export class GoodDeedUpdateDto {
  @AutoMap()
  Id: number;

  @AutoMap()
  DeedInfo: string;
}
