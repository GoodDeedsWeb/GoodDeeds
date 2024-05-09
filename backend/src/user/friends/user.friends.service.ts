/* eslint-disable prettier/prettier */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserFriend } from 'src/entities/db_entities/user.friend';
import { Result } from 'src/entities/result';
import { FriendAddDto } from 'src/entities/user_friend_dto/friend.add.dto';
import { FriendDeleteDto } from 'src/entities/user_friend_dto/friend.delete.dto';
import { FriendSearchDto as FriendSearchDto } from 'src/entities/user_friend_dto/friend.search.dto';
import { IUserFriendRepository } from 'src/interfaces/repositories/user.friend.repository.interface';
import { IUserFriendService } from 'src/interfaces/services/user.friend.service.interfaces';
import { IUserService } from 'src/interfaces/services/user.service.interface';

@Injectable()
export class UserFriendService implements IUserFriendService {  
  constructor(@Inject('IUserFriendRepository') private readonly userFriendRepository: IUserFriendRepository,
    @Inject('IUserService') private readonly userService: IUserService,
    @InjectMapper() private readonly mapper: Mapper) {}
    
    async createUserFriend(userFriendCreateDto: FriendAddDto): Promise<Result> {
        const userFriend = this.mapper.map(userFriendCreateDto, FriendAddDto, UserFriend)

        const isSuccess = await this.userFriendRepository.create(userFriend);

        if (!isSuccess) {
            return { IsSuccess: false, StatusCode: HttpStatus.INTERNAL_SERVER_ERROR, Message: `Internal server error.` };
        }

        return { IsSuccess: true, StatusCode: HttpStatus.CREATED, Message: `Friend has been added.` };
    }

    async isFriendship(userFriendSearch: FriendSearchDto): Promise<boolean> {
        const userFriend = this.mapper.map(userFriendSearch, FriendSearchDto, UserFriend);

        const foundUserFriend = await this.userFriendRepository.findUserFriend(userFriend);

        return foundUserFriend ? true : false;
    }

    async deleteUserFriend(userFriendDeleteDto: FriendDeleteDto): Promise<Result> {
        const userFriend = this.mapper.map(userFriendDeleteDto, FriendDeleteDto, UserFriend)

        const foundUserFriend = await this.userFriendRepository.findUserFriend(userFriend);

        if (!foundUserFriend) {
          return { IsSuccess: false, StatusCode: HttpStatus.NOT_FOUND, Message: `Friend don\`t exist.` };
        }
    
        const deletedUserFriend = await this.userFriendRepository.delete(foundUserFriend);
    
        if (!deletedUserFriend) {
          return { IsSuccess: false, StatusCode: HttpStatus.INTERNAL_SERVER_ERROR, Message: `Internal server error.` };
        }
    
        return { IsSuccess: true, StatusCode: HttpStatus.OK, Message: `Friend has been deleted.` };
    }

}
