/* eslint-disable prettier/prettier */
import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { GoodDeed } from 'src/entities/db_entities/good.deed';
import { GoodDeedCreateDto } from 'src/entities/good_deed_dto/good.deed.create.dto';
import { GoodDeedDto } from 'src/entities/good_deed_dto/good.deed.dto';
import { GoodDeedUpdateDto } from 'src/entities/good_deed_dto/good.geed.update.dto';

@Injectable()
export class GoodDeedProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, GoodDeedCreateDto, GoodDeed, forMember((destination) => destination.Id, ignore()));
      createMap(mapper, GoodDeedUpdateDto, GoodDeed, forMember((destination) => destination.Id, ignore()));
      createMap(mapper, GoodDeed, GoodDeedDto)
    };
  }
}
