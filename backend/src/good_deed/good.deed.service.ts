/* eslint-disable prettier/prettier */
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { IGoodDeedRepository } from 'src/interfaces/repositories/good.deed.repository.interface';
import { IGoodDeedService } from 'src/interfaces/services/good.deed.service.interface';
import { GoodDeed } from 'src/entities/db_entities/good.deed';
import { GoodDeedCreateDto } from 'src/entities/good_deed_dto/good.deed.create.dto';
import { GoodDeedDeleteDto } from 'src/entities/good_deed_dto/good.deed.delete.dto';
import { Result } from 'src/entities/result';
import { GoodDeedUpdateDto } from 'src/entities/good_deed_dto/good.geed.update.dto';
import { GoodDeedDto } from 'src/entities/good_deed_dto/good.deed.dto';
import { IUserFriendService } from 'src/interfaces/services/user.friend.service.interfaces';

@Injectable()
export class GoodDeedService implements IGoodDeedService {
  constructor(
    @Inject('IGoodDeedRepository') private readonly goodDeedRepository: IGoodDeedRepository,
    @Inject('IUserFriendService') private readonly userFriendService: IUserFriendService,
    @InjectMapper() private readonly mapper: Mapper) {}

    private goodDeedList: GoodDeedDto[] = []; 
    private friendGoodDeedList: string[] = [];

    async createGoodDeed(goodDeedCreate: GoodDeedCreateDto, userId: string): Promise<Result> {
        const goodDeed = this.mapper.map(goodDeedCreate, GoodDeedCreateDto, GoodDeed)
        goodDeed.UserId = userId;

        const newGoodDeed = await this.goodDeedRepository.create(goodDeed);

        if (!newGoodDeed) {
            return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
        }

        return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `Good deed has been created.` };
    }

    async findByUserId(userId: string): Promise<GoodDeedDto[] | null> {
        const userGoodDeeds = await this.goodDeedRepository.findByUserId(userId);

        if (!userGoodDeeds) {
            return null;
        }

        this.goodDeedList.splice(0)

        userGoodDeeds.forEach(element => {
            this.goodDeedList.push({ Id: element.Id, GoodDeed: element.GoodDeed });
        });

        return this.goodDeedList;
    }

    async findFriendGoodDeeds(userId: string, friendId: string): Promise<string[] | null> {
        if (!await this.userFriendService.isFriendship({ UserId: userId, FriendId: friendId })) {
            return null;
        }

        const friendGoodDeed = await this.findByUserId(friendId);

        if (!friendGoodDeed) {
            return null;
        }

        this.friendGoodDeedList.splice(0)

        friendGoodDeed.forEach(element => {
            this.friendGoodDeedList.push(element.GoodDeed);
        });

        return this.friendGoodDeedList;
    }

    async updateGoodDeed(goodDeedUpdate: GoodDeedUpdateDto, userId: string): Promise<Result> {
        const foundGoodDeed = await this.goodDeedRepository.findById(goodDeedUpdate.Id);
        
        if (!foundGoodDeed) {
            return { isSuccess: false, statusCode: HttpStatus.NOT_FOUND, message: `Good deed is not exist.` };
        }

        if (foundGoodDeed.UserId != userId) {
            return { isSuccess: false, statusCode: HttpStatus.BAD_REQUEST, message: `This user don\`t have such good deed.` };   
        }

        const updateGoodDeed = this.mapper.map(goodDeedUpdate, GoodDeedUpdateDto, GoodDeed);

        const countUpdatedGoodDeed = await this.goodDeedRepository.update(updateGoodDeed);

        if (countUpdatedGoodDeed != 1) {
            return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
          }
      
          return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `Good deed has been updated.` };
    }

    async deleteGoodDeed(goodDeedDelete: GoodDeedDeleteDto, userId: string): Promise<Result> {
        const foundGoodDeed = await this.goodDeedRepository.findByUserIdAndDeed(userId, goodDeedDelete.GoodDeed);

        if (!foundGoodDeed) {
          return { isSuccess: false, statusCode: HttpStatus.NOT_FOUND, message: `Good deed don\`t exist.` };
        }
    
        const deletedGoodDeed = await this.goodDeedRepository.delete(foundGoodDeed);
    
        if (!deletedGoodDeed) {
          return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
        }
    
        return { isSuccess: true, statusCode: HttpStatus.OK, message: `Good deed has been deleted.` };
    }
}
