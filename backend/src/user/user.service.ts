/* eslint-disable prettier/prettier */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Result } from '../entities/result';
import { User } from '../entities/db_entities/user';
import { UserCreateDto } from '../entities/user_dto/user.create.dto';
import { UserDto } from '../entities/user_dto/user.dto';
import { UserLoginDto } from '../entities/user_dto/user.login.dto';
import { UserUpdateDto } from '../entities/user_dto/user.update.dto';;
import { IUserRepository } from '../interfaces/repositories/user.repository.interface';
import { IUserService } from '../interfaces/services/user.service.interface';
import { randomBytes } from 'crypto';
import { LoginResult } from '../entities/login.result';
import { PaginationParameter } from '../entities/pagination/pagination.parameters';
import { UsersDataWithPagingMetaData } from '../entities/wrapers/users.data.with.paging.meta.data';
import { MetaData } from '../entities/pagination/meta.data';
import { UserDeleteDto } from '../entities/user_dto/user.delete.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    @InjectMapper() private readonly mapper: Mapper) {}

  async registerUser(userCreate: UserCreateDto): Promise<Result> {
    const foundUser = await this.userRepository.findByEmail(userCreate.Email);

    if (foundUser) {
      return { IsSuccess: false, StatusCode: HttpStatus.BAD_REQUEST, Message: `User with email ${userCreate.Email} already exist` };
    }

    const user = this.mapper.map(userCreate, UserCreateDto, User)

    user.Id = randomBytes(5).toString('hex');

    const newUser = await this.userRepository.create(user);

    if (!newUser) {
      return { IsSuccess: false, StatusCode: HttpStatus.INTERNAL_SERVER_ERROR, Message: `Internal server error` };
    }

    return { IsSuccess: true, StatusCode: HttpStatus.CREATED, Message: `User has been created` };
  }

  async loginUser(userLogin: UserLoginDto): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(userLogin.Email);

    if (!user) {
      return { StatusCode: 400, Message: 'Incorrect email' }
    }

    if (user.Password !== userLogin.Password) {
      return { StatusCode: 400, Message: 'Incorrect password' }
    }

    const payload = { sub: user.Id };
    const token = this.jwtService.sign(payload);

    return { StatusCode: 200, Jwt: token, UserId: user.Id };
  }

  async findById(userId: string): Promise<UserDto | null> {
    const user = await this.userRepository.findById(userId);

    return this.mapper.map(user, User, UserDto);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(email);

    return this.mapper.map(user, User, UserDto);
  }

  async getOtherUsers(myId: string, pagingParam: PaginationParameter): Promise<UsersDataWithPagingMetaData | null> {
    const users = await this.userRepository.getOther(myId);

    if (!users) {
      return null;
    }

    const start = (pagingParam.currentPage - 1) * pagingParam.pageSize ;
    const end = start + Number(pagingParam.pageSize);
    const slicedUsersArray = users.slice(start, end);

    const metaData = new MetaData(pagingParam.pageSize, pagingParam.currentPage, users.length)

    const resultUsersArray = slicedUsersArray.map((user) => this.mapper.map(user, User, UserDto));

    return { UsersDto: resultUsersArray, MetaData: metaData };
  }

  async updateUser(userUpdate: UserUpdateDto): Promise<Result> {
    const existUser = await this.userRepository.findById(userUpdate.Id);

    if (!existUser){
      return { IsSuccess: false, StatusCode: HttpStatus.NOT_FOUND, Message: `User don\`t exist` };
    }

    const updateUser = this.mapper.map(userUpdate, UserUpdateDto, User);

    const countUpdatedUser = await this.userRepository.update(updateUser);

    if (countUpdatedUser != 1) {
      return { IsSuccess: false, StatusCode: HttpStatus.INTERNAL_SERVER_ERROR, Message: `Internal server error` };
    }

    return { IsSuccess: true, StatusCode: HttpStatus.CREATED, Message: `User data has been updated` };
  }

  async deleteMyAccount(userDeleteDto: UserDeleteDto): Promise<Result> {
    const foundUser = await this.userRepository.findById(userDeleteDto.Id);

    if (!foundUser) {
      return { IsSuccess: false, StatusCode: HttpStatus.NOT_FOUND, Message: `User don\`t exist` };
    }

    const deletedUser = await this.userRepository.delete(foundUser);

    if (!deletedUser) {
      return { IsSuccess: false, StatusCode: HttpStatus.INTERNAL_SERVER_ERROR, Message: `Internal server error` };
    }

    return { IsSuccess: true, StatusCode: HttpStatus.OK, Message: `User - ${deletedUser.Name} has been deleted` };
  }
}
