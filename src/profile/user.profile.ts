/* eslint-disable prettier/prettier */
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UserCreateDto } from 'src/entities/user.dto/UserCreareDto';
import { UserLoginDto } from 'src/entities/user.dto/UserLoginDto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, UserCreateDto, User, forMember((destination) => destination.id, ignore()));
      createMap(mapper, UserLoginDto, User, forMember((destination) => destination.id, ignore()));
    };
  }
}
