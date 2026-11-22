import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserData } from './user-data.entity';

@Injectable()
export class UserDataService {
  constructor(
    @InjectRepository(UserData)
    private readonly userDataRepository: Repository<UserData>,
  ) {}

  add(userId: number, data: Record<string, unknown>) {
    return this.userDataRepository.save(
      this.userDataRepository.create({ userId, data }),
    );
  }

  getAll(userId: number) {
    return this.userDataRepository.find({ where: { userId } });
  }

  async getOne(id: number, userId: number) {
    const row = await this.userDataRepository.findOneBy({ id, userId });
    if (!row) {
      throw new NotFoundException('Данные не найдены');
    }
    return row;
  }

  async update(id: number, userId: number, data: Record<string, unknown>) {
    const row = await this.getOne(id, userId);
    row.data = data;
    return this.userDataRepository.save(row);
  }

  async remove(id: number, userId: number) {
    const result = await this.userDataRepository.delete({ id, userId });
    if (result.affected === 0) {
      throw new NotFoundException('Данные не найдены');
    }
  }
}
