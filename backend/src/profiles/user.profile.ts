/* eslint-disable prettier/prettier */
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/db_entities/user';
import { UserCreateDto } from 'src/entities/user.dto/user.create.dto';
import { UserDto } from 'src/entities/user.dto/user.dto';
import { UserLoginDto } from 'src/entities/user.dto/user.login.dto';
import { UserUpdateDto } from 'src/entities/user.dto/user.update.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, UserCreateDto, User, forMember((destination) => destination.Id, ignore()));
      createMap(mapper, UserLoginDto, User, forMember((destination) => destination.Id, ignore()));
      createMap(mapper, UserUpdateDto, User);
      createMap(mapper, User, UserDto)
    };
  }
}
