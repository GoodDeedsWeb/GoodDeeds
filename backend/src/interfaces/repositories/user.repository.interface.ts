import { User } from 'src/entities/db_entities/user';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  update(user: User): Promise<number>;
  delete(user: User): Promise<User>;
}
