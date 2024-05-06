/* eslint-disable prettier/prettier */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Jwt } from 'src/entities/jwt';
import { Result } from 'src/entities/result';
import { User } from 'src/entities/db_entities/user';
import { UserCreateDto } from 'src/entities/user_dto/user.create.dto';
import { UserDto } from 'src/entities/user_dto/user.dto';
import { UserLoginDto } from 'src/entities/user_dto/user.login.dto';
import { UserUpdateDto } from 'src/entities/user_dto/user.update.dto';;
import { IUserRepository } from 'src/interfaces/repositories/user.repository.interface';
import { IUserService } from 'src/interfaces/services/user.service.interface';
import { UserDeleteDto } from 'src/entities/user_dto/user.delete.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    @InjectMapper() private readonly mapper: Mapper) {}

  async registerUser(userCreate: UserCreateDto): Promise<Result> {
    const foundUser = await this.userRepository.findByName(userCreate.Name);

    if (foundUser) {
      return { isSuccess: false, statusCode: HttpStatus.CONFLICT, message: `User already exist.` };
    }

    const user = this.mapper.map(userCreate, UserCreateDto, User)

    const newUser = await this.userRepository.create(user);

    if (!newUser) {
      return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
    }

    return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `User has been created.` };
  }

  async loginUser(userLogin: UserLoginDto): Promise<Jwt | null> {
    const user = await this.userRepository.findByName(userLogin.Name);

    if (!user) {
      return null;
    }

    if (user.Password !== userLogin.Password) {
      throw new UnauthorizedException('Password is incorrect.');
    }

    const payload = { sub: user.Id, name: user.Name };
    const token = this.jwtService.sign(payload);

    return { token: token };
  }

  async findById(userId: string): Promise<UserDto | null> {
    const user = await this.userRepository.findById(userId);

    return this.mapper.map(user, User, UserDto);
  }

  async findByName(name: string): Promise<UserDto | null> {
    const user = await this.userRepository.findByName(name);

    return this.mapper.map(user, User, UserDto);
  }

  async getAll(): Promise<UserDto[]> {
    const users = await this.userRepository.getAll();

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
    const foundUser = await this.userRepository.findByName(userDelete.Name);

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
