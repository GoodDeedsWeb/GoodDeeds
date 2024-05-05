/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodDeed } from 'src/entities/db_entities/good.deed';
import { IGoodDeedRepository } from 'src/interfaces/repositories/good.deed.repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class GoodDeedRepository implements IGoodDeedRepository {  
  constructor(@InjectRepository(GoodDeed) private readonly goodDeedRepository: Repository<GoodDeed>) {}

    async create(goodDeed: GoodDeed): Promise<GoodDeed> {
        return await this.goodDeedRepository.save(goodDeed);
    }

    async findById(id: number): Promise<GoodDeed | null> {
        return await this.goodDeedRepository.findOne({ where: { Id: id }, relations: ['User']  });
    }

    async findByUserId(userId: number): Promise<GoodDeed[] | null> {
        return (await this.goodDeedRepository.find({ where: { UserId: userId }, relations: ['User'] }));
    }
    
    async update(goodDeed: GoodDeed): Promise<number> {
        const updateResult = await this.goodDeedRepository.update({ Id: goodDeed.Id }, goodDeed);

        return updateResult.affected;
    }

    async delete(goodDeed: GoodDeed): Promise<GoodDeed> {
        return await this.goodDeedRepository.remove(goodDeed);
    }

}
