/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFriend } from 'src/entities/db_entities/user.friend';
import { AuthenticationGuardModule } from 'src/authentication_guard/authentication.guard.module';
import { UserFriendProfile } from './profiles/user.friend.profile';
import { USER_FRIEND_REPOSITORY_TOKEN, USER_FRIEND_SERVICE_TOKEN } from 'src/constants/user.friend.token';
import { UserFriendService } from './user.friends.service';
import { UserFriendRepository } from './user.friend.repository';
import { UserModule } from 'src/user/user.module';
import { UserFriendController } from './user.friend.controller';


@Module({
  imports: [AuthenticationGuardModule, UserModule, TypeOrmModule.forFeature([UserFriend])],
  providers: [
    UserFriendProfile,
    {
      provide: USER_FRIEND_SERVICE_TOKEN,
      useClass: UserFriendService,
    },
    {
      provide: USER_FRIEND_REPOSITORY_TOKEN,
      useClass: UserFriendRepository,
    },
  ],
  controllers: [UserFriendController],
  exports: [USER_FRIEND_SERVICE_TOKEN, USER_FRIEND_REPOSITORY_TOKEN],
})
export class UserFriendModule {}
