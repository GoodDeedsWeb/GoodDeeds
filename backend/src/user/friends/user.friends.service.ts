/* eslint-disable prettier/prettier */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserFriend } from 'src/entities/db_entities/user.friend';
import { Result } from 'src/entities/result';
import { UserFriendCreateDto } from 'src/entities/user_friend_dto/user.friend.create.dto';
import { UserFriendDeleteDto } from 'src/entities/user_friend_dto/user.friend.delete.dto';
import { UserFriendDto } from 'src/entities/user_friend_dto/user.friend.dto';
import { UserFriendSearchDto } from 'src/entities/user_friend_dto/user.friend.search.dto';
import { IUserFriendRepository } from 'src/interfaces/repositories/user.friend.repository.interface';
import { IUserFriendService } from 'src/interfaces/services/user.friend.service.interfaces';
import { IUserService } from 'src/interfaces/services/user.service.interface';

@Injectable()
export class UserFriendService implements IUserFriendService {  
  constructor(@Inject('IUserFriendRepository') private readonly userFriendRepository: IUserFriendRepository,
    @Inject('IUserService') private readonly userService: IUserService,
    @InjectMapper() private readonly mapper: Mapper) {}

    private friendList: UserFriendDto[] = [];
    
    async createUserFriend(userFriendCreateDto: UserFriendCreateDto, userId: string): Promise<Result> {
        const userFriend = this.mapper.map(userFriendCreateDto, UserFriendCreateDto, UserFriend)

        userFriend.UserId = userId;

        const isSuccess = await this.userFriendRepository.create(userFriend);

        if (!isSuccess) {
            return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
        }

        return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `Friend has been added.` };
    }

    async findByUserId(userId: string): Promise<UserFriendDto[] | null> {
        const foundUser = await this.userService.findById(userId);

        if (!foundUser) {
            return null;
        }

        const userFriends = await this.userFriendRepository.findByUserId(userId);

        if (!userFriends) {
            return null;
        }

        this.friendList.splice(0)

        userFriends.forEach(element => {
            this.friendList.push({ FriendId: element.Friend.Id, FriendName: element.Friend.Name });
        });

        return this.friendList;
    }

    async isFriendship(userFriendSearch: UserFriendSearchDto): Promise<boolean> {
        const userFriend = this.mapper.map(userFriendSearch, UserFriendSearchDto, UserFriend);

        const foundUserFriend = await this.userFriendRepository.findUserFriend(userFriend);

        return foundUserFriend ? true : false;
    }

    async deleteUserFriend(userFriendDeleteDto: UserFriendDeleteDto, userId: string): Promise<Result> {
        const userFriend = this.mapper.map(userFriendDeleteDto, UserFriendDeleteDto, UserFriend)

        userFriend.UserId = userId;

        const foundUserFriend = await this.userFriendRepository.findUserFriend(userFriend);

        if (!foundUserFriend) {
          return { isSuccess: false, statusCode: HttpStatus.NOT_FOUND, message: `Friend don\`t exist.` };
        }
    
        const deletedUserFriend = await this.userFriendRepository.delete(foundUserFriend);
    
        if (!deletedUserFriend) {
          return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
        }
    
        return { isSuccess: true, statusCode: HttpStatus.OK, message: `Friend has been deleted.` };
    }

}
