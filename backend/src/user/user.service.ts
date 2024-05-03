/* eslint-disable prettier/prettier */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Jwt } from 'src/entities/jwt';
import { RequestResult } from 'src/entities/request.result';
import { User } from 'src/entities/user';
import { User } from 'src/entities/db_entities/user';
import { UserCreateDto } from 'src/entities/user.dto/user.create.dto';
import { UserDto } from 'src/entities/user.dto/user.dto';
import { UserLoginDto } from 'src/entities/user.dto/user.login.dto';
import { UserUpdateDto } from 'src/entities/user.dto/user.update.dto';;
import { IUserRepository } from 'src/interfaces/repositories/user.repository.interface';
import { IUserService } from 'src/interfaces/services/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    @InjectMapper() private readonly mapper: Mapper) {}

  registerUser(userCreateDto: UserCreateDto): RequestResult {
    if (userCreateDto.name.length <= 1 || userCreateDto.name === undefined || userCreateDto.password.length <= 1 || userCreateDto.password === undefined) {
      return { isSuccess: false, statusCode: HttpStatus.BAD_REQUEST, message: 'Incorrect name or password.' };
    }

    if (this.userRepository.findByName(userCreateDto.name) !== undefined) {
      return { isSuccess: false, statusCode: HttpStatus.CONFLICT, message: `User with name - ${userCreateDto.name} already exist.` };
    }

    const user = this.mapper.map(userCreateDto, UserCreateDto, User)
    const countUserCreated = this.userRepository.create(user);

    if (countUserCreated != 1){
      return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
    }

    return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `User - ${user.name} has been created.` };
  }

  loginUser(userLoginDto: UserLoginDto): Jwt | undefined {
    const user = this.userRepository.findByName(userLoginDto.name);
    if (user === undefined) {
      return undefined;
    }

    if (user.password !== userLoginDto.password) {
      throw new UnauthorizedException('Password is incorrect.');
    }

    const payload = { sub: user.id, name: user.name };
    const token = this.jwtService.sign(payload);
    return { token: token };
  }

  findUserByName(name: string): UserDto | undefined {
    const user = this.userRepository.findByName(name);

    return this.mapper.map(user, User, UserDto);
  }

  getAllUsers(): UserDto[] {
    const users = this.userRepository.getAll();

    return users.map((user) => this.mapper.map(user, User, UserDto));
  }

  updateUser(userUpdateDto: UserUpdateDto): RequestResult{
    const updateUser = this.mapper.map(userUpdateDto, UserUpdateDto, User);

    if (!this.userRepository.update(updateUser)){
      return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
    }

    return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `User data has been updated.` };
  }
}
