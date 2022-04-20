import { Body, Controller, HttpException, Post } from '@nestjs/common';
import User from 'src/users/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post()
  create(@Body() data: { userId: string }): Promise<User | HttpException> {
    const { userId } = data;
    return this.authService.authenticate(userId);
  }
}
