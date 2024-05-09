/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationGuard } from 'src/authentication_guard/authentication.guard';
import { FriendAddDto } from 'src/entities/user_friend_dto/friend.add.dto';
import { IUserFriendService } from 'src/interfaces/services/user.friend.service.interfaces';
import { FriendDeleteDto } from 'src/entities/user_friend_dto/friend.delete.dto';

@Controller('friend')
export class UserFriendController {
  constructor(@Inject('IUserFriendService') private readonly userFriendService: IUserFriendService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async addFriend(@Body() userFriendCreate: FriendAddDto, @Res({ passthrough: true }) res: Response): Promise<string> {
    const result = await this.userFriendService.createUserFriend(userFriendCreate);

    res.status(result.StatusCode);

    return result.Message;
  }
  
  @UseGuards(AuthenticationGuard)
  @Delete()
  async deleteFriend(@Body() userFriendDeleteDto: FriendDeleteDto, @Res({ passthrough: true }) res: Response): Promise<string> {
    const result = await this.userFriendService.deleteUserFriend(userFriendDeleteDto);

    res.status(result.StatusCode);

    return result.Message;
  }
}
