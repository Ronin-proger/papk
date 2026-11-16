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
import { AccountLogicService } from '../../logic/account-logic/account-logic.service';
import { BlockUserGuard } from '../user-http/block-user/block-user.guard';
import { AuthDto } from './dto/auth.dto';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';

@Controller('api/v1')
export class AccountHttpController {
  constructor(private accountLogic: AccountLogicService) {}

  @Post('auth')
  auth(@Body() dto: AuthDto) {
    return this.accountLogic.auth(dto);
  }

  @Post('data')
  @UseGuards(BlockUserGuard)
  create(@Req() req: any, @Body() dto: CreateDataDto) {
    return this.accountLogic.createData(req.userId, dto);
  }

  @Get('data')
  @UseGuards(BlockUserGuard)
  findAll(@Req() req: any) {
    return this.accountLogic.findAll(req.userId);
  }

  @Get('data/:id')
  @UseGuards(BlockUserGuard)
  findOne(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.accountLogic.findOne(id, req.userId);
  }

  @Patch('data/:id')
  @UseGuards(BlockUserGuard)
  update(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDataDto,
  ) {
    return this.accountLogic.update(id, req.userId, dto);
  }

  @Delete('data/:id')
  @UseGuards(BlockUserGuard)
  remove(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.accountLogic.remove(id, req.userId);
  }
}
