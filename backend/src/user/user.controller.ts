/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { UserUpdateDto } from '../entities/user.dto/user.update.dto';
import { IUserService } from '../interfaces/services/user.service.interface';
import { UserDto } from '../entities/user.dto/user.dto';
import { UserCreateDto } from '../entities/user.dto/user.create.dto';
import { Response } from 'express';
import { Jwt } from '../entities/jwt';
import { UserLoginDto } from '../entities/user.dto/user.login.dto';
import { AuthenticationGuard } from './guard/authentication.guard';
import { UserDeleteDto } from 'src/entities/user.dto/user.delete.dto';

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

    if (token === undefined){
      res.status(HttpStatus.BAD_REQUEST);
      return;
    }

    res.status(HttpStatus.OK);
    return token;
  }

  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getUser(@Request() req): Promise<UserDto> {
    return await this.userService.findUserByName(req.user['name']);
  }

  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  @Get('all')
  async getAllUser(): Promise<UserDto[]> {
    return await this.userService.getAllUsers();
  }

  @UseGuards(AuthenticationGuard)
  @Put('update')
  async updateUser(@Body() userUpdateDto: UserUpdateDto, @Res({ passthrough: true }) res: Response): Promise<string> {
    const result = await this.userService.updateUser(userUpdateDto);

    res.status(result.statusCode);

    return result.message;
  }

  @UseGuards(AuthenticationGuard)
  @Delete('delete')
  async deleteUser(@Body() userDeleteDto: UserDeleteDto, @Res({ passthrough: true }) res: Response): Promise<string> {
    const result = await this.userService.deleteUser(userDeleteDto);

    res.status(result.statusCode);

    return result.message;
  }
}
