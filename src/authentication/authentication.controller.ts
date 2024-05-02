import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserLoginDto } from 'src/entities/user.dto/user.login.dto';
import { UserCreateDto } from 'src/entities/user.dto/user.create.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  signIn(@Body() userLoginDto: UserLoginDto): string {
    return this.authService.signIn(userLoginDto.name, userLoginDto.password);
  }

  @Post('register')
  signUp(@Body() userCreateDto: UserCreateDto): string {
    return this.authService.signUp(userCreateDto);
  }
}
