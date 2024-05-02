import { UserCreateDto } from 'src/entities/user.dto/user.create.dto';
import { UserDto } from 'src/entities/user.dto/user.dto';
import { UserUpdateDto } from 'src/entities/user.dto/user.update.dto';

export const USER_SERVICE_TOKEN = 'IUserService';

export interface IUserService {
  createUser(userCreateDto: UserCreateDto): number;
  findUserByName(name: string): UserDto | undefined;
  getAllUsers(): UserDto[];
  updateUser(userUpdateDto: UserUpdateDto);
}
