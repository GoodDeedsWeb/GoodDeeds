/* eslint-disable prettier/prettier */
import { LoginResult } from 'src/entities/login.result';
import { PaginationParameter } from 'src/entities/pagination/pagination.parameters';
import { Result } from 'src/entities/result';
import { UserCreateDto } from 'src/entities/user_dto/user.create.dto';
import { UserDeleteDto } from 'src/entities/user_dto/user.delete.dto';
import { UserDto } from 'src/entities/user_dto/user.dto';
import { UserLoginDto } from 'src/entities/user_dto/user.login.dto';
import { UserUpdateDto } from 'src/entities/user_dto/user.update.dto';
import { UsersDataWithPagingMetaData } from 'src/entities/wrapers/users.data.with.paging.meta.data';

export interface IUserService {
  registerUser(userCreate: UserCreateDto): Promise<Result>;
  loginUser(userLogin: UserLoginDto): Promise<LoginResult>;
  findById(userId: string): Promise<UserDto | null>;
  findByEmail(email: string): Promise<UserDto | null>;
  getOtherUsers(myId: string, pagingParam: PaginationParameter): Promise<UsersDataWithPagingMetaData | null>;
  updateUser(userUpdate: UserUpdateDto): Promise<Result>;
  deleteMyAccount(userDeleteDto: UserDeleteDto): Promise<Result>;
}
