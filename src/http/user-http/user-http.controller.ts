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
import { UserService } from '../../logic/user/user.service';
import { BlockUserGuard } from './block-user/block-user.guard';

@Controller('users')
@UseGuards(BlockUserGuard)
export class UserHttpController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('by-name/:name')
  getUserByName(@Param('name') name: string) {
    return this.userService.getUserByName(name);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @Post()
  createUser(@Body('name') name: string) {
    return this.userService.createUser(name);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body('name') name: string) {
    return this.userService.updateUser(+id, name);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
