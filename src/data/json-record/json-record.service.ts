import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JsonRecordEntity } from './json-record.entity';

@Injectable()
export class JsonRecordService {
  constructor(
    @InjectRepository(JsonRecordEntity)
    private readonly jsonRecordRepository: Repository<JsonRecordEntity>,
  ) {}

  add(userId: number, payload: Record<string, unknown>) {
    return this.jsonRecordRepository.save(
      this.jsonRecordRepository.create({ userId, payload }),
    );
  }

  getAll(userId: number) {
    return this.jsonRecordRepository.find({ where: { userId } });
  }

  async getOne(id: number, userId: number) {
    const row = await this.jsonRecordRepository.findOneBy({ id, userId });
    if (!row) {
      throw new NotFoundException('Данные не найдены');
    }
    return row;
  }

  async update(id: number, userId: number, payload: Record<string, unknown>) {
    const row = await this.getOne(id, userId);
    row.payload = payload;
    return this.jsonRecordRepository.save(row);
  }

  async remove(id: number, userId: number) {
    const result = await this.jsonRecordRepository.delete({ id, userId });
    if (result.affected === 0) {
      throw new NotFoundException('Данные не найдены');
    }
  }
}
