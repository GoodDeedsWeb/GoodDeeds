/* eslint-disable prettier/prettier */
import { GoodDeedCreateDto } from 'src/entities/good_deed_dto/good.deed.create.dto';
import { GoodDeedDeleteDto } from 'src/entities/good_deed_dto/good.deed.delete.dto';
import { GoodDeedUpdateDto } from 'src/entities/good_deed_dto/good.geed.update.dto';
import { Result } from 'src/entities/result';
import { PaginationParameter } from 'src/entities/pagination/pagination.parameters';
import { GoodDeedsWithPagingMetaData } from 'src/entities/wrapers/good.deeds.with.paging.meta.data';

export interface IGoodDeedService {
  createGoodDeed(goodDeedCreate: GoodDeedCreateDto): Promise<Result>;
  findByUserId(userId: string, pagingParam: PaginationParameter): Promise<GoodDeedsWithPagingMetaData | null>;
  updateGoodDeed(goodDeedUpdate: GoodDeedUpdateDto): Promise<Result>;
  deleteGoodDeed(goodDeedDelete: GoodDeedDeleteDto): Promise<Result>;
}
