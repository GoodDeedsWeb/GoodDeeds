import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProfile } from 'src/profile/user.profile';
import { UserRepository } from './user.repository';
import { USER_REPOSITORY_TOKEN } from 'src/interfaces/repositories/user.repository.interface';
import { USER_SERVICE_TOKEN } from 'src/interfaces/services/user.service.interface';

@Module({
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
  exports: [USER_SERVICE_TOKEN, USER_REPOSITORY_TOKEN],
  controllers: [UserController],
})
export class UserModule {}
