import { Jwt } from 'src/entities/jwt';
import { RequestResult } from 'src/entities/request.result';
import { UserCreateDto } from 'src/entities/user.dto/user.create.dto';
import { UserDeleteDto } from 'src/entities/user.dto/user.delete.dto';
import { UserDto } from 'src/entities/user.dto/user.dto';
import { UserLoginDto } from 'src/entities/user.dto/user.login.dto';
import { UserUpdateDto } from 'src/entities/user.dto/user.update.dto';

export interface IUserService {
  registerUser(userCreateDto: UserCreateDto): Promise<RequestResult>;
  loginUser(userLoginDto: UserLoginDto): Promise<Jwt | undefined>;
  findUserByName(name: string): Promise<UserDto | undefined>;
  getAllUsers(): Promise<UserDto[]>;
  updateUser(userUpdateDto: UserUpdateDto): Promise<RequestResult>;
  deleteUser(userDeleteDto: UserDeleteDto): Promise<RequestResult>;
}
