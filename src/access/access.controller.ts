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
import { BlockUserGuard } from '../common/block-user/block-user.guard';
import { AccessService } from './access.service';
import { AuthDto } from './dto/auth.dto';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';

@Controller('api/v1')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post('auth')
  auth(@Body() dto: AuthDto) {
    return this.accessService.auth(dto);
  }

  @Post('data')
  @UseGuards(BlockUserGuard)
  create(@Req() req: any, @Body() dto: CreateDataDto) {
    return this.accessService.createData(req.userId, dto);
  }

  @Get('data')
  @UseGuards(BlockUserGuard)
  findAll(@Req() req: any) {
    return this.accessService.findAll(req.userId);
  }

  @Get('data/:id')
  @UseGuards(BlockUserGuard)
  findOne(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.accessService.findOne(id, req.userId);
  }

  @Patch('data/:id')
  @UseGuards(BlockUserGuard)
  update(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDataDto,
  ) {
    return this.accessService.update(id, req.userId, dto);
  }

  @Delete('data/:id')
  @UseGuards(BlockUserGuard)
  remove(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.accessService.remove(id, req.userId);
  }
}
