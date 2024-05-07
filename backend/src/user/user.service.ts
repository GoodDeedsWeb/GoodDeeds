/* eslint-disable prettier/prettier */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Result } from 'src/entities/result';
import { User } from 'src/entities/db_entities/user';
import { UserCreateDto } from 'src/entities/user_dto/user.create.dto';
import { UserDto } from 'src/entities/user_dto/user.dto';
import { UserLoginDto } from 'src/entities/user_dto/user.login.dto';
import { UserUpdateDto } from 'src/entities/user_dto/user.update.dto';;
import { IUserRepository } from 'src/interfaces/repositories/user.repository.interface';
import { IUserService } from 'src/interfaces/services/user.service.interface';
import { UserDeleteDto } from 'src/entities/user_dto/user.delete.dto';
import { LoginResponse } from 'src/entities/login.response';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    @InjectMapper() private readonly mapper: Mapper) {}

  async registerUser(userCreate: UserCreateDto): Promise<Result> {
    const foundUser = await this.userRepository.findByEmail(userCreate.Email);

    if (foundUser) {
      return { isSuccess: false, statusCode: HttpStatus.BAD_REQUEST, message: `User with email ${userCreate.Email} already exist.` };
    }

    const user = this.mapper.map(userCreate, UserCreateDto, User)

    user.Id = randomBytes(5).toString('base64');

    const newUser = await this.userRepository.create(user);

    if (!newUser) {
      return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
    }

    return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `User has been created.` };
  }

  async loginUser(userLogin: UserLoginDto): Promise<LoginResponse | null> {
    const user = await this.userRepository.findByEmail(userLogin.Email);

    if (!user) {
      return null;
    }

    if (user.Password !== userLogin.Password) {
      throw new UnauthorizedException('Password is incorrect.');
    }

    const payload = { sub: user.Id };
    const token = this.jwtService.sign(payload);

    return { Jwt: token, UserId: user.Id };
  }

  async findById(userId: string): Promise<UserDto | null> {
    const user = await this.userRepository.findById(userId);

    return this.mapper.map(user, User, UserDto);
  }

  async findByName(name: string): Promise<UserDto | null> {
    const user = await this.userRepository.findByName(name);

    return this.mapper.map(user, User, UserDto);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(email);

    return this.mapper.map(user, User, UserDto);
  }

  async getOtherUsers(myId: string): Promise<UserDto[] | null> {
    const users = await this.userRepository.getOther(myId);

    return users.map((user) => this.mapper.map(user, User, UserDto));
  }

  async updateUser(userUpdate: UserUpdateDto, userId: string): Promise<Result> {
    const existUser = await this.userRepository.findById(userId);

    if (!existUser){
      return { isSuccess: false, statusCode: HttpStatus.NOT_FOUND, message: `User don\`t exist.` };
    }

    const updateUser = this.mapper.map(userUpdate, UserUpdateDto, User);

    updateUser.Id = userId;

    const countUpdatedUser = await this.userRepository.update(updateUser);

    if (countUpdatedUser != 1) {
      return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
    }

    return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `User data has been updated.` };
  }

  async deleteUser(userDelete: UserDeleteDto): Promise<Result> {
    const foundUser = await this.userRepository.findByEmail(userDelete.Email);

    if (!foundUser) {
      return { isSuccess: false, statusCode: HttpStatus.NOT_FOUND, message: `User don\`t exist.` };
    }

    const deletedUser = await this.userRepository.delete(foundUser);

    if (!deletedUser) {
      return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
    }

    return { isSuccess: true, statusCode: HttpStatus.OK, message: `User - ${deletedUser.Name} has been deleted.` };
  }
}
