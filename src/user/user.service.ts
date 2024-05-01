import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';

@Injectable()
export class UserService {
  private users = [
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
  private currentId = 3;

  findUser(name: string): User | undefined {
    return this.users.find((user) => user.name === name);
  }
  createUser(name: string, password: string): number {
    this.currentId += 1;
    const oldLength = this.users.length;
    if (!this.users.every((user) => user.name !== name)) {
      return 0;
    }
    const newLength = this.users.push({
      id: this.currentId,
      name: name,
      password: password,
    });
    return newLength - oldLength;
  }
}
