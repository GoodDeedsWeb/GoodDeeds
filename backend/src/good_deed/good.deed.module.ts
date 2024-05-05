/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GOOD_DEED_REPOSITORY_TOKEN, GOOD_DEED_SERVICE_TOKEN } from 'src/constants/good.deed.tokens';
import { GoodDeed } from 'src/entities/db_entities/good.deed';
import { UserModule } from 'src/user/user.module';
import { GoodDeedService } from './good.deed.service';
import { GoodDeedController } from './good.deed.controller';
import { GoodDeedRepository } from './good.deed.repository';
import { GoodDeedProfile } from './profiles/good.deed.profile';
import { AuthenticationGuardModule } from 'src/authentication_guard/authentication.guard.module';

@Module({
  imports: [
    AuthenticationGuardModule,
    UserModule,
    TypeOrmModule.forFeature([GoodDeed]),
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
