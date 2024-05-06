/* eslint-disable prettier/prettier */
import { GoodDeed } from 'src/entities/db_entities/good.deed';

export interface IGoodDeedRepository {
  create(goodDeed: GoodDeed): Promise<GoodDeed>;
  findById(id: number): Promise<GoodDeed | null>;
  findByUserId(userId: string): Promise<GoodDeed[] | null>;
  findByUserIdAndDeed(userId: string, goodDeed: string): Promise<GoodDeed | null>;
  update(goodDeed: GoodDeed): Promise<number>;
  delete(goodDeed: GoodDeed): Promise<GoodDeed>;
}
