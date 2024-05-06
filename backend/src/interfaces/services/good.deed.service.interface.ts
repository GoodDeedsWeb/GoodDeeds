/* eslint-disable prettier/prettier */
import { GoodDeedCreateDto } from 'src/entities/good_deed_dto/good.deed.create.dto';
import { GoodDeedDeleteDto } from 'src/entities/good_deed_dto/good.deed.delete.dto';
import { GoodDeedUpdateDto } from 'src/entities/good_deed_dto/good.geed.update.dto';
import { GoodDeedDto } from 'src/entities/good_deed_dto/good.deed.dto';
import { Result } from 'src/entities/result';

export interface IGoodDeedService {
  createGoodDeed(goodDeedCreate: GoodDeedCreateDto, userId: string): Promise<Result>;
  findByUserId(userId: string): Promise<GoodDeedDto[] | null>;
  findFriendGoodDeeds(userId: string, friendId: string): Promise<string[] | null>;
  updateGoodDeed(goodDeedUpdate: GoodDeedUpdateDto, userId: string): Promise<Result>;
  deleteGoodDeed(goodDeedDelete: GoodDeedDeleteDto, userId: string): Promise<Result>;
}
