/* eslint-disable prettier/prettier */
import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { GoodDeed } from 'src/entities/db_entities/good.deed';
import { GoodDeedCreateDto } from 'src/entities/good_deed_dto/good.deed.create.dto';
import { GoodDeedDeleteDto } from 'src/entities/good_deed_dto/good.deed.delete.dto';
import { GoodDeedUpdateDto } from 'src/entities/good_deed_dto/good.geed.update.dto';

@Injectable()
export class GoodDeedProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, GoodDeedCreateDto, GoodDeed);
      createMap(mapper, GoodDeedDeleteDto, GoodDeed);
      createMap(mapper, GoodDeedUpdateDto, GoodDeed)
    };
  }
}
