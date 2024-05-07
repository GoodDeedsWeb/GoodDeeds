/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECURITY_KEY } from '../constants/jwt.security.key';
import { AuthenticationGuard } from '../authentication_guard/authentication.guard';
import { AUTH_GUARD } from '../constants/guards';


@Module({
  imports: [
    JwtModule.register({
      global: false,
      secret: JWT_SECURITY_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    {
      provide: AUTH_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
  exports: [AUTH_GUARD, JwtModule],
})
export class AuthenticationGuardModule {}
