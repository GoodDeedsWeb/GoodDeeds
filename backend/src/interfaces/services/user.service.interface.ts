import { Jwt } from 'src/entities/jwt';
import { Result } from 'src/entities/result';
import { UserCreateDto } from 'src/entities/user_dto/user.create.dto';
import { UserDeleteDto } from 'src/entities/user_dto/user.delete.dto';
import { UserDto } from 'src/entities/user_dto/user.dto';
import { UserLoginDto } from 'src/entities/user_dto/user.login.dto';
import { UserUpdateDto } from 'src/entities/user_dto/user.update.dto';

export interface IUserService {
  registerUser(userCreate: UserCreateDto): Promise<Result>;
  loginUser(userLogin: UserLoginDto): Promise<Jwt | null>;
  findById(userId: number): Promise<UserDto | null>;
  findById(userId: string): Promise<UserDto | null>;
  findByName(name: string): Promise<UserDto | null>;
  getAll(): Promise<UserDto[]>;
  updateUser(userUpdate: UserUpdateDto): Promise<Result>;
  deleteUser(userDelete: UserDeleteDto): Promise<Result>;
}
