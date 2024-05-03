/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AutoMapperModule } from './automapper/autoMapper.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './db_config/db.config'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule, 
    AutoMapperModule, 
    ConfigModule.forRoot({
      isGlobal: true, 
      load: [dbConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => (configService.get('db_config'))
    }), 
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
