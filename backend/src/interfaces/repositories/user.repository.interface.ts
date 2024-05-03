import { User } from 'src/entities/db_entities/user';

export interface IUserRepository {
  create(newUser: User): Promise<User>;
  findByName(name: string): Promise<User | undefined>;
  getAll(): Promise<User[]>;
  update(newUser: User): Promise<number>;
}
