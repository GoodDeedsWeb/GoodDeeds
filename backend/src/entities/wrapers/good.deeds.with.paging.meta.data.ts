import { GoodDeedDto } from '../good_deed_dto/good.deed.dto';
import { MetaData } from '../pagination/meta.data';

export class GoodDeedsWithPagingMetaData {
  GoodDeeds: GoodDeedDto[];

  MetaData: MetaData;
}
