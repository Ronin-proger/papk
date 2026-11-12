import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BlockUserGuard } from '../common/block-user/block-user.guard';
import { UsersService } from './users.service';

@UseGuards(BlockUserGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<string[]> {
    return this.usersService.getAllUsers();
  }

  @Get('by-name/:name')
  getUserByName(@Param('name') name: string): Promise<string> {
    return this.usersService.getUserByName(name);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<string> {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  createUser(@Body('name') name: string) {
    return this.usersService.createUser(name);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body('name') name: string) {
    return this.usersService.updateUser(Number(id), name);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
