import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserByID(@Param('id') id: string) {
    return this.usersService.getUserByID(Number(id));
  }

  @Post()
  createUser(@Body('name') name: string) {
    return this.usersService.createUser(name);
  }
}
