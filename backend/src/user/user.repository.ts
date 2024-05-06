/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/db_entities/user';
import { IUserRepository } from 'src/interfaces/repositories/user.repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {  
  constructor(@InjectRepository(User) private readonly userStorage: Repository<User>) {}

  async create(user: User): Promise<User> {
    return await this.userStorage.save(user);
  }

  async findById(id: string): Promise<User> {
    return await this.userStorage.findOne({ where: { Id: id } }); 
  }

  async findByName(name: string): Promise<User | null> {
    return await this.userStorage.findOne({ where: { Name: name } });
  }

  async getAll(): Promise<User[]> {
    return await this.userStorage.find();
  }

  async update(user: User): Promise<number>{
    const updateResult = await this.userStorage.update({ Id: user.Id }, user);

    return updateResult.affected;
  }

  async delete(user: User): Promise<User>{
    return await this.userStorage.remove(user);
  }
}
