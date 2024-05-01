import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserProfileDto } from 'src/entities/user.dto/UserProfileDto';
import { CreateUserDto } from 'src/entities/user.dto/CreareUserDto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  signIn(@Body() userProfileDto: UserProfileDto): string {
    return this.authService.signIn(
      userProfileDto.name,
      userProfileDto.password,
    );
  }

  @Post('register')
  signUp(@Body() createUserDto: CreateUserDto): string {
    return this.authService.signUp(createUserDto.name, createUserDto.password);
  }
}
