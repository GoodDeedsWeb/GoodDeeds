/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GOOD_DEED_REPOSITORY_TOKEN, GOOD_DEED_SERVICE_TOKEN } from '../constants/good.deed.tokens';
import { GoodDeed } from '../entities/db_entities/good.deed';
import { GoodDeedService } from './good.deed.service';
import { GoodDeedController } from './good.deed.controller';
import { GoodDeedRepository } from './good.deed.repository';
import { AuthenticationGuardModule } from '../authentication_guard/authentication.guard.module';
import { GoodDeedProfile } from '../profiles/good.deed.profile';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    AuthenticationGuardModule,
    TypeOrmModule.forFeature([GoodDeed]),
    UserModule,
  ],
  providers: [
      GoodDeedProfile,
      {
        provide: GOOD_DEED_SERVICE_TOKEN,
        useClass: GoodDeedService,
      },
      {
        provide: GOOD_DEED_REPOSITORY_TOKEN,
        useClass: GoodDeedRepository,
      },
    ],
  controllers: [GoodDeedController],
  exports: [GOOD_DEED_SERVICE_TOKEN, GOOD_DEED_REPOSITORY_TOKEN],
})
export class GoodDeedModule {}
