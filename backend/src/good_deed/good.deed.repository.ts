/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodDeed } from 'src/entities/db_entities/good.deed';
import { IGoodDeedRepository } from 'src/interfaces/repositories/good.deed.repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class GoodDeedRepository implements IGoodDeedRepository {  
  constructor(@InjectRepository(GoodDeed) private readonly goodDeedStorage: Repository<GoodDeed>) {}

    async create(goodDeed: GoodDeed): Promise<GoodDeed> {
        return await this.goodDeedStorage.save(goodDeed);
    }

    async findById(id: number): Promise<GoodDeed | null> {
        return await this.goodDeedStorage.findOne({ where: { Id: id }, relations: ['User']  });
    }

    async findByUserId(userId: string): Promise<GoodDeed[]> {
        const goodDeeds = await this.goodDeedStorage.find({
            where: { UserId: userId },
            relations: ['User'],
          });
        
          return goodDeeds.sort((a, b) => a.Id - b.Id);
    }
    
    async update(goodDeed: GoodDeed): Promise<number> {
        const updateResult = await this.goodDeedStorage.update({ Id: goodDeed.Id }, goodDeed);

        return updateResult.affected;
    }

    async delete(goodDeed: GoodDeed): Promise<GoodDeed> {
        return await this.goodDeedStorage.remove(goodDeed);
    }

}
