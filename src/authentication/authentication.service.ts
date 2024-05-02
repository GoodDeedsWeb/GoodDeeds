/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCreateDto } from 'src/entities/user.dto/UserCreareDto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  signIn(name: string, password: string): string {
    const user = this.userService.findUser(name);
    if (user === undefined) {
      return 'Username is incorrect.';
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Password is incorrect.');
    }

    return 'Your jwt).';
  }

  signUp(userCreateDto: UserCreateDto): string {
    if (userCreateDto.name.length <= 1 || userCreateDto.name === undefined || userCreateDto.password.length <= 1 || userCreateDto.password === undefined) {
      return 'Incorrect name or password.';
    }
    
    const countUserCreated = this.userService.createUser(userCreateDto);
    return `Count user created = ${countUserCreated}`;
  }
}
