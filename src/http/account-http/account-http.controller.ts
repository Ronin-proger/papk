import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccountService } from '../../logic/account/account.service';
import { BlockUserGuard } from '../user-http/block-user/block-user.guard';
import { AuthDto } from './dto/auth.dto';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';

type RequestWithUserId = Request & { userId: number };

@Controller('api/v1')
export class AccountHttpController {
  constructor(private readonly accountService: AccountService) {}

  @Post('auth')
  auth(@Body() dto: AuthDto) {
    return this.accountService.auth(dto.login);
  }

  @Post('data')
  @UseGuards(BlockUserGuard)
  create(@Req() req: RequestWithUserId, @Body() dto: CreateDataDto) {
    return this.accountService.createData(req.userId, dto.data);
  }

  @Get('data')
  @UseGuards(BlockUserGuard)
  findAll(@Req() req: RequestWithUserId) {
    return this.accountService.findAll(req.userId);
  }

  @Get('data/:id')
  @UseGuards(BlockUserGuard)
  findOne(
    @Req() req: RequestWithUserId,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.accountService.findOne(id, req.userId);
  }

  @Patch('data/:id')
  @UseGuards(BlockUserGuard)
  update(
    @Req() req: RequestWithUserId,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDataDto,
  ) {
    return this.accountService.update(id, req.userId, dto.data);
  }

  @Delete('data/:id')
  @UseGuards(BlockUserGuard)
  remove(
    @Req() req: RequestWithUserId,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.accountService.remove(id, req.userId);
  }
}
