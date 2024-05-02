import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AutoMapperModule } from './automapper/autoMapper.module';

@Module({
  imports: [UserModule, AutoMapperModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
