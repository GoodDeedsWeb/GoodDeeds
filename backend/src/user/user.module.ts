/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProfile } from 'src/profile/user.profile';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECURITY_KEY } from 'src/constants/jwt.security.key';
import { AuthenticationGuard } from './guard/authentication.guard';
import { USER_REPOSITORY_TOKEN, USER_SERVICE_TOKEN } from 'src/constants/user.tokens';
import { AUTH_GUARD } from 'src/constants/guards';

@Module({
  imports: [
    JwtModule.register({
      global: false,
      secret: JWT_SECURITY_KEY,
      signOptions: { expiresIn: '60s' },
    }),
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
    {
      provide: AUTH_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
  controllers: [UserController],
  exports: [USER_SERVICE_TOKEN, USER_REPOSITORY_TOKEN, AUTH_GUARD, JwtModule],
})
export class UserModule {}
