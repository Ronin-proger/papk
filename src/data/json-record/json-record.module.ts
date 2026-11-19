import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonRecordEntity } from './json-record.entity';
import { JsonRecordService } from './json-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([JsonRecordEntity])],
  providers: [JsonRecordService],
  exports: [JsonRecordService],
})
export class JsonRecordModule {}
