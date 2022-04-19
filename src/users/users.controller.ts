import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import User from './user.entity';
import UserService from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) { }

  @Get()
  list(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() userData: User): Promise<User> {
    return this.usersService.create(userData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userData: User): Promise<any> {
    userData.id = Number(id);
    console.log('Update #' + userData.id);
    return this.usersService.update(userData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.usersService.delete(Number(id));
  }
}
