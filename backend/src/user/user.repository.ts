/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/db_entities/user';
import { IUserRepository } from 'src/interfaces/repositories/user.repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {  
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { Id: id } }); 
  }

  async findByName(name: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { Name: name } });
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async update(user: User): Promise<number>{
    const updateResult = await this.userRepository.update({ Id: user.Id }, user);

    return updateResult.affected;
  }

  async delete(user: User): Promise<User>{
    return await this.userRepository.remove(user);
  }
}
