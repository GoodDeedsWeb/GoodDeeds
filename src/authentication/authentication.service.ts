import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  signUp(name: string, password: string): string {
    if (
      name.length <= 1 ||
      name === undefined ||
      password.length <= 1 ||
      password === undefined
    ) {
      return 'Incorrect name or password.';
    }

    const countUserCreated = this.userService.createUser(name, password);

    return `Count user created = ${countUserCreated}`;
  }
}
