import { User } from 'src/entities/db_entities/user';

export interface IUserRepository {
  create(newUser: User): number;
  findByName(name: string): User | undefined;
  getAll(): User[];
  update(newUser: User): boolean;
}
