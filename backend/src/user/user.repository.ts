/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/db_entities/user';
import { IUserRepository } from 'src/interfaces/repositories/user.repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {  
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(newUser: User): Promise<User> {
    return await this.userRepository.save(newUser);
  }

  async findByName(name: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { name: name } });
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async update(updateUser: User): Promise<number>{
    const existUser = await this.userRepository.findOne({ where: { id: updateUser.id } });

    if (!existUser){
      throw new NotFoundException();
    }

    const updateResult = await this.userRepository.update({ id: updateUser.id }, updateUser);

    return updateResult.affected;
  }

  async delete(user: User): Promise<User>{
    return await this.userRepository.remove(user);
  }
}
