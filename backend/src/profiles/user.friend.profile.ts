/* eslint-disable prettier/prettier */
import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserFriend } from 'src/entities/db_entities/user.friend';
import { FriendAddDto } from 'src/entities/user_friend_dto/friend.add.dto';
import { FriendDeleteDto } from 'src/entities/user_friend_dto/friend.delete.dto';
import { FriendSearchDto } from 'src/entities/user_friend_dto/friend.search.dto';

@Injectable()
export class UserFriendProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, FriendAddDto, UserFriend);
      createMap(mapper, FriendDeleteDto, UserFriend);
      createMap(mapper, FriendSearchDto, UserFriend);
    };
  }
}
