import { User } from 'src/entities/user';

export const USER_REPOSITORY_TOKEN = 'IUserRepository';

export interface IUserRepository {
  create(newUser: User): number;
  findByName(name: string): User | undefined;
  getAll(): User[];
  update(newUser: User);
}
