import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserLoginDto } from 'src/entities/user.dto/UserLoginDto';
import { UserCreateDto } from 'src/entities/user.dto/UserCreareDto';

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
