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
import { UserGoodDeedsDto } from 'src/entities/good_deed_dto/user.good.deeds.dto';
import { IUserService } from 'src/interfaces/services/user.service.interface';

@Injectable()
export class GoodDeedService implements IGoodDeedService {
  constructor(
    @Inject('IGoodDeedRepository') private readonly goodDeedRepository: IGoodDeedRepository,
    @Inject('IUserService') private readonly userService: IUserService,
    @InjectMapper() private readonly mapper: Mapper) {}

    private userGoodDeeds: string[] = []; 

    async createGoodDeed(goodDeedCreate: GoodDeedCreateDto, userId: number): Promise<Result> {
        const goodDeed = this.mapper.map(goodDeedCreate, GoodDeedCreateDto, GoodDeed)
        goodDeed.UserId = userId;

        const newGoodDeed = await this.goodDeedRepository.create(goodDeed);

        if (!newGoodDeed) {
            return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
        }

        return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `Good deed has been created.` };
    }

    async findByUserId(userId: number): Promise<UserGoodDeedsDto | null> {
        const foundUser = await this.userService.findById(userId);

        if (!foundUser) {
            return null;
        }

        const goodDeeds = await this.goodDeedRepository.findByUserId(userId);

        if (!goodDeeds || !goodDeeds[0].User) {
            return null;
        }

        this.userGoodDeeds.splice(0)

        goodDeeds.forEach(element => {
            this.userGoodDeeds.push(element.GoodDeed);
        });

        return { Username: goodDeeds[0].User.Name, GoodDeeds: this.userGoodDeeds }
    }

    async updateGoodDeed(goodDeedUpdate: GoodDeedUpdateDto): Promise<Result> {
        const foundGoodDeed = await this.goodDeedRepository.findById(goodDeedUpdate.Id);
        
        if (!foundGoodDeed) {
            return { isSuccess: false, statusCode: HttpStatus.NOT_FOUND, message: `Good deed is not exist.` };
        }

        const updateGoodDeed = this.mapper.map(goodDeedUpdate, GoodDeedUpdateDto, GoodDeed);

        const countUpdatedGoodDeed = await this.goodDeedRepository.update(updateGoodDeed);

        if (countUpdatedGoodDeed != 1) {
            return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
          }
      
          return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `Good deed has been updated.` };
    }

    async deleteGoodDeed(goodDeedDelete: GoodDeedDeleteDto): Promise<Result> {
        const foundGoodDeed = await this.goodDeedRepository.findById(goodDeedDelete.Id);

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
