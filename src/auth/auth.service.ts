import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ErrorType } from 'src/types';
import User from 'src/users/user.entity';
import UsersService from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }

  async authenticate(userId: string): Promise<User | HttpException> {
    const users = await this.userService.findAll();
    const user = users.find(
      (user) => user.email.toLowerCase() === userId.toLocaleLowerCase(),
    );
    if (user) {
      return user;
    } else {
      const errorResp: ErrorType = {
        status: HttpStatus.UNAUTHORIZED,
        error: `Invalid credentials`,
      };
      throw new HttpException(errorResp, HttpStatus.FORBIDDEN);
    }
  }
}
