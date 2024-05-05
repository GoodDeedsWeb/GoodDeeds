/* eslint-disable prettier/prettier */
import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserFriend } from 'src/entities/db_entities/user.friend';
import { UserFriendCreateDto } from 'src/entities/user_friend_dto/user.friend.create.dto';
import { UserFriendDeleteDto } from 'src/entities/user_friend_dto/user.friend.delete.dto';

@Injectable()
export class UserFriendProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, UserFriendCreateDto, UserFriend);
      createMap(mapper, UserFriendDeleteDto, UserFriend);
    };
  }
}
