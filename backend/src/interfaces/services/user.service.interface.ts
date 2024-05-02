import { Jwt } from 'src/entities/jwt';
import { RequestResult } from 'src/entities/request.result';
import { UserCreateDto } from 'src/entities/user.dto/user.create.dto';
import { UserDto } from 'src/entities/user.dto/user.dto';
import { UserLoginDto } from 'src/entities/user.dto/user.login.dto';
import { UserUpdateDto } from 'src/entities/user.dto/user.update.dto';

export interface IUserService {
  registerUser(userCreateDto: UserCreateDto): RequestResult;
  loginUser(userLoginDto: UserLoginDto): Jwt | undefined;
  findUserByName(name: string): UserDto | undefined;
  getAllUsers(): UserDto[];
  updateUser(userUpdateDto: UserUpdateDto): RequestResult;
}
