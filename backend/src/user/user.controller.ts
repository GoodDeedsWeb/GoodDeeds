/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Inject, Post, Put, Query } from '@nestjs/common';
import { UserUpdateDto } from 'src/entities/user.dto/user.update.dto';
import { IUserService } from 'src/interfaces/services/user.service.interface';
import { UserDto } from 'src/entities/user.dto/user.dto';
import { UserCreateDto } from 'src/entities/user.dto/user.create.dto';

@Controller('user')
export class UserController {
  constructor(@Inject('IUserService') private readonly userService: IUserService) {}

  @Post('create')
  createUser(@Body() userCreateDto: UserCreateDto): number {
    return this.userService.createUser(userCreateDto);
  }

  @Get()
  getUser(@Query('name') name: string): UserDto {
    return this.userService.findUserByName(name);
  }

  @Get('all')
  getAllUser(): UserDto[] {
    return this.userService.getAllUsers();
  }

  @Put('update')
  updateUser(@Body() userUpdateDto: UserUpdateDto) {
    this.userService.updateUser(userUpdateDto);
  }
}
