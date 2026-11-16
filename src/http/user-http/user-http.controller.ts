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
import { UserLogicService } from '../../logic/user-logic/user-logic.service';
import { BlockUserGuard } from './block-user/block-user.guard';

@Controller('users')
@UseGuards(BlockUserGuard)
export class UserHttpController {
  constructor(private userLogic: UserLogicService) {}

  @Get()
  getAllUsers() {
    return this.userLogic.getAllUsers();
  }

  @Get('by-name/:name')
  getUserByName(@Param('name') name: string) {
    return this.userLogic.getUserByName(name);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userLogic.getUserById(+id);
  }

  @Post()
  createUser(@Body('name') name: string) {
    return this.userLogic.createUser(name);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body('name') name: string) {
    return this.userLogic.updateUser(+id, name);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userLogic.deleteUser(+id);
  }
}
