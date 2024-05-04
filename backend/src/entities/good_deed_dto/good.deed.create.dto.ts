import { AutoMap } from '@automapper/classes';

export class GoodDeedCreateDto {
  @AutoMap()
  DeedInfo: string;
}
