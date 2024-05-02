import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProfile } from 'src/profile/user.profile';

@Module({
  providers: [UserService, UserProfile],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
