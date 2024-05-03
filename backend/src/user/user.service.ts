/* eslint-disable prettier/prettier */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Jwt } from 'src/entities/jwt';
import { RequestResult } from 'src/entities/request.result';
import { User } from 'src/entities/db_entities/user';
import { UserCreateDto } from 'src/entities/user.dto/user.create.dto';
import { UserDto } from 'src/entities/user.dto/user.dto';
import { UserLoginDto } from 'src/entities/user.dto/user.login.dto';
import { UserUpdateDto } from 'src/entities/user.dto/user.update.dto';;
import { IUserRepository } from 'src/interfaces/repositories/user.repository.interface';
import { IUserService } from 'src/interfaces/services/user.service.interface';
import { UserDeleteDto } from 'src/entities/user.dto/user.delete.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    @InjectMapper() private readonly mapper: Mapper) {}

  async registerUser(userCreateDto: UserCreateDto): Promise<RequestResult> {
    // TODO: сделать валидацию
    if (userCreateDto.Name.length <= 1 || userCreateDto.Name === undefined || userCreateDto.Password.length <= 1 || userCreateDto.Password === undefined) {
      return { isSuccess: false, statusCode: HttpStatus.BAD_REQUEST, message: 'Incorrect name or password.' };
    }
    
    const foundUser = await this.userRepository.findByName(userCreateDto.Name);

    if (foundUser) {
      return { isSuccess: false, statusCode: HttpStatus.CONFLICT, message: `User with name - ${userCreateDto.Name} already exist.` };
    }

    const user = this.mapper.map(userCreateDto, UserCreateDto, User)

    const newUser = await this.userRepository.create(user);

    if (!newUser){
      return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
    }

    return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `User - ${newUser.Name} has been created.` };
  }

  async loginUser(userLoginDto: UserLoginDto): Promise<Jwt | undefined> {
    const user = await this.userRepository.findByName(userLoginDto.Name);

    if (!user) {
      return undefined;
    }

    if (user.Password !== userLoginDto.Password) {
      throw new UnauthorizedException('Password is incorrect.');
    }

    const payload = { sub: user.Id, name: user.Name };
    const token = this.jwtService.sign(payload);

    return { token: token };
  }

  async findUserByName(name: string): Promise<UserDto | undefined> {
    const user = await this.userRepository.findByName(name);

    return this.mapper.map(user, User, UserDto);
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.getAll();

    return users.map((user) => this.mapper.map(user, User, UserDto));
  }

  async updateUser(userUpdateDto: UserUpdateDto): Promise<RequestResult>{
    const updateUser = this.mapper.map(userUpdateDto, UserUpdateDto, User);

    const countUpdatedUser = await this.userRepository.update(updateUser);

    if (countUpdatedUser != 1){
      return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
    }

    return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `User data has been updated.` };
  }

  async deleteUser(userDeleteDto: UserDeleteDto): Promise<RequestResult> {
    const foundUser = await this.userRepository.findByName(userDeleteDto.Name);

    if (!foundUser){
      return { isSuccess: false, statusCode: HttpStatus.NOT_FOUND, message: `User with name - ${userDeleteDto.Name} don\`t exist.` };
    }

    const deletedUser = await this.userRepository.delete(foundUser);

    if (!deletedUser){
      return { isSuccess: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error.` };
    }

    return { isSuccess: true, statusCode: HttpStatus.CREATED, message: `User - ${deletedUser.Name} has been deleted.` };
  }
}
