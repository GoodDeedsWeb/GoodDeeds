import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UserCreateDto } from 'src/entities/user.dto/UserCreareDto';

@Injectable()
export class UserService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  private users: User[] = [
    {
      id: 1,
      name: 'Gleb',
      password: 'Qwerty',
    },
    {
      id: 2,
      name: 'Vlad',
      password: 'vLaD2005',
    },
    {
      id: 3,
      name: 'Egor',
      password: 'playZet',
    },
  ];

  private currentId: number = 3;

  findUser(name: string): User | undefined {
    return this.users.find((user) => user.name === name);
  }

  createUser(userCreateDto: UserCreateDto): number {
    const newUser = this.mapper.map(userCreateDto, UserCreateDto, User);
    newUser.id = this.currentId++;
    const oldLength = this.users.length;

    if (!this.users.every((user) => user.name !== newUser.name)) {
      return 0;
    }

    const newLength = this.users.push(newUser);
    return newLength - oldLength;
  }
}
