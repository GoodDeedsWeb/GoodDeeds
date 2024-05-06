/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { USER_REPOSITORY_TOKEN, USER_SERVICE_TOKEN } from '../constants/user.tokens';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/db_entities/user';
import { AuthenticationGuardModule } from '../authentication_guard/authentication.guard.module';
import { UserProfile } from '../profiles/user.profile';
import { UserFriendProfile } from '../profiles/user.friend.profile';
import { USER_FRIEND_REPOSITORY_TOKEN, USER_FRIEND_SERVICE_TOKEN } from '../constants/user.friend.token';
import { UserFriendService } from './friends/user.friends.service';
import { UserFriendRepository } from './friends/user.friend.repository';
import { UserFriend } from '../entities/db_entities/user.friend';
import { UserFriendController } from './friends/user.friend.controller';


@Module({
  imports: [
  AuthenticationGuardModule,
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([UserFriend])
  ],
  providers: [
    UserProfile,
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
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
  controllers: [UserController, UserFriendController],
  exports: [USER_SERVICE_TOKEN, USER_REPOSITORY_TOKEN, USER_FRIEND_SERVICE_TOKEN, USER_FRIEND_REPOSITORY_TOKEN],
})
export class UserModule {}
