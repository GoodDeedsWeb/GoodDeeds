/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { UserUpdateDto } from '../entities/user_dto/user.update.dto';
import { IUserService } from '../interfaces/services/user.service.interface';
import { UserDto } from '../entities/user_dto/user.dto';
import { UserCreateDto } from '../entities/user_dto/user.create.dto';
import { Response } from 'express';
import { Jwt } from '../entities/jwt';
import { UserLoginDto } from '../entities/user_dto/user.login.dto';
import { AuthenticationGuard } from '../authentication_guard/authentication.guard';
import { UserDeleteDto } from 'src/entities/user_dto/user.delete.dto';

@Controller('user')
export class UserController {
  constructor(@Inject('IUserService') private readonly userService: IUserService) {}

  @Post('register')
  async registerUser(@Body() userCreateDto: UserCreateDto, @Res({ passthrough: true }) res: Response): Promise<string> {
    const result = await this.userService.registerUser(userCreateDto);

    res.status(result.statusCode);

    return result.message;
  }

  @Post('login')
  async loginUser(@Body() userLoginDto: UserLoginDto, @Res({ passthrough: true }) res: Response): Promise<Jwt> {
    const token = await this.userService.loginUser(userLoginDto);

    if (!token){
      res.status(HttpStatus.BAD_REQUEST);
      return;
    }

    res.status(HttpStatus.OK);
    return token;
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
  @Get('all')
  async getAllUser(): Promise<UserDto[]> {
    return await this.userService.getAll();
  }

  // TODO: сделать токен не валидный и отдать новый
  @UseGuards(AuthenticationGuard)
  @Put()
  async updateUser(@Body() userUpdateDto: UserUpdateDto, @Res({ passthrough: true }) res: Response): Promise<string> {
    const result = await this.userService.updateUser(userUpdateDto);

    res.status(result.statusCode);

    return result.message;
  }

  @UseGuards(AuthenticationGuard)
  @Delete()
  async deleteUser(@Body() userDeleteDto: UserDeleteDto, @Res({ passthrough: true }) res: Response): Promise<string> {
    const result = await this.userService.deleteUser(userDeleteDto);

    res.status(result.statusCode);

    return result.message;
  }
}
