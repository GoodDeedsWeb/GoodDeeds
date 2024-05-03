/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/db_entities/user';
import { IUserRepository } from 'src/interfaces/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {  
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

  create(newUser: User): number {
    if (!this.users.every((user) => user.name !== newUser.name)) {
      return 0;
    }
    newUser.id = ++this.currentId;
    const oldLength = this.users.length;
    const newLength = this.users.push({ id: newUser.id, name: newUser.name, password: newUser.password });
    return newLength - oldLength;
  }

  findByName(name: string): User | undefined {
    return this.users.find((user) => user.name === name);
  }

  getAll(): User[] {
    return this.users;
  }

  update(newUser: User): boolean{
    try{
      this.users = this.users.map((user) => user.id === newUser.id ? { id: newUser.id, name: newUser.name, password: newUser.password } : user);
      return true;
    }
    catch {
      return false;
    }
  }
}
