/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Post, Put, Query, Request, Res, UseGuards } from '@nestjs/common';
import { UserUpdateDto } from '../entities/user_dto/user.update.dto';
import { IUserService } from '../interfaces/services/user.service.interface';
import { UserDto } from '../entities/user_dto/user.dto';
import { UserCreateDto } from '../entities/user_dto/user.create.dto';
import { Response } from 'express';
import { UserLoginDto } from '../entities/user_dto/user.login.dto';
import { AuthenticationGuard } from '../authentication_guard/authentication.guard';
import { UserDeleteDto } from 'src/entities/user_dto/user.delete.dto';
import { LoginResponse } from 'src/entities/login.response';
import { ResponseMessage } from 'src/entities/response.message';

@Controller('user')
export class UserController {
  constructor(@Inject('IUserService') private readonly userService: IUserService) {}

  @Post('register')
  async registerUser(@Body() userCreateDto: UserCreateDto, @Res({ passthrough: true }) res: Response): Promise<ResponseMessage> {
    const result = await this.userService.registerUser(userCreateDto);

    res.status(result.statusCode);

    return { message: result.message };
  }

  @Post('login')
  async loginUser(@Body() userLoginDto: UserLoginDto, @Res({ passthrough: true }) res: Response): Promise<LoginResponse> {
    const loginResult = await this.userService.loginUser(userLoginDto);

    if (loginResult.StatusCode == 400){
      res.status(HttpStatus.BAD_REQUEST);
      return { message: loginResult.Message };
    }

    res.status(HttpStatus.OK);
    return { jwt: loginResult.Jwt, userId: loginResult.UserId };
  }

  @UseGuards(AuthenticationGuard)
  @Get()
  async getUser(@Query('userId') userId: string, @Res({ passthrough: true }) res: Response): Promise<UserDto> {
    if (!userId) {
      res.status(HttpStatus.BAD_REQUEST);
      return;
    }

    const user = await this.userService.findById(userId);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }
    
    res.status(HttpStatus.OK);
    return user;
  }

  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  @Get('other')
  async getOtherUsers(@Request() req, @Res({ passthrough: true }) res: Response): Promise<UserDto[]> {
    const users = await this.userService.getOtherUsers(req.user['sub']);

    if (!users) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return users;
  }

  @UseGuards(AuthenticationGuard)
  @Put()
  async updateUser(@Body() userUpdateDto: UserUpdateDto, @Request() req, @Res({ passthrough: true }) res: Response): Promise<ResponseMessage> {
    const result = await this.userService.updateUser(userUpdateDto, req.user['sub']);

    res.status(result.statusCode);

    return { message: result.message }
  }

  @UseGuards(AuthenticationGuard)
  @Delete()
  async deleteUser(@Body() userDeleteDto: UserDeleteDto, @Res({ passthrough: true }) res: Response): Promise<ResponseMessage> {
    const result = await this.userService.deleteUser(userDeleteDto);

    res.status(result.statusCode);

    return { message: result.message }
  }
}
