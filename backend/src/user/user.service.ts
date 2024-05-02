/* eslint-disable prettier/prettier */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UserCreateDto } from 'src/entities/user.dto/user.create.dto';
import { UserDto } from 'src/entities/user.dto/user.dto';
import { UserUpdateDto } from 'src/entities/user.dto/user.update.dto';;
import { IUserRepository } from 'src/interfaces/repositories/user.repository.interface';
import { IUserService } from 'src/interfaces/services/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @InjectMapper() private readonly mapper: Mapper) {}

  createUser(userCreateDto: UserCreateDto): number {
    const newUser = this.mapper.map(userCreateDto, UserCreateDto, User);

    if (this.userRepository.findByName(newUser.name) !== undefined) {
      return 0;
    }

    return this.userRepository.create(newUser);
  } 
    
  findUserByName(name: string): UserDto | undefined {
    const user = this.userRepository.findByName(name);
    return this.mapper.map(user, User, UserDto);
  }

  getAllUsers(): UserDto[] {
    const users = this.userRepository.getAll();
    return users.map((user) => this.mapper.map(user, User, UserDto));
  }

  updateUser(userUpdateDto: UserUpdateDto){
    const updateUser = this.mapper.map(userUpdateDto, UserUpdateDto, User);
    this.userRepository.update(updateUser)
  }
}
