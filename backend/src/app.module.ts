/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AutoMapperModule } from './automapper/autoMapper.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './db_config/db.config'
import { TypeOrmModule } from '@nestjs/typeorm';;
import { GoodDeedModule } from './good_deed/good.deed.module';
import { AuthenticationGuardModule } from './authentication_guard/authentication.guard.module';
import { UserFriendModule } from './user_friends/user.friend.module';

@Module({
  imports: [
    UserModule,
    GoodDeedModule,
    UserFriendModule,
    AutoMapperModule, 
    AuthenticationGuardModule,
    ConfigModule.forRoot({
      isGlobal: true, 
      load: [dbConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => (configService.get('db_config')),
      inject: [ConfigService],
    }), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
