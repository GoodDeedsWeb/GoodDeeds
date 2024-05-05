/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { USER_REPOSITORY_TOKEN, USER_SERVICE_TOKEN } from '../constants/user.tokens';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/db_entities/user';
import { UserProfile } from './profiles/user.profile';
import { AuthenticationGuardModule } from 'src/authentication_guard/authentication.guard.module';


@Module({
  imports: [
  AuthenticationGuardModule,
  TypeOrmModule.forFeature([User]),
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
  ],
  controllers: [UserController],
  exports: [USER_SERVICE_TOKEN, USER_REPOSITORY_TOKEN],
})
export class UserModule {}
