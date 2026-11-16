import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessToken } from './access-token.entity';
import { UserData } from './user-data.entity';

@Injectable()
export class AccountDataService {
  constructor(
    @InjectRepository(AccessToken) private tokens: Repository<AccessToken>,
    @InjectRepository(UserData) private rows: Repository<UserData>,
  ) {}

  saveToken(userId: number, accessKey: string) {
    const t = this.tokens.create({ userId, accessKey });
    return this.tokens.save(t);
  }

  async getUserId(accessKey: string) {
    const t = await this.tokens.findOneBy({ accessKey });
    if (t) {
      return t.userId;
    }
    return null;
  }

  addData(userId: number, data: any) {
    return this.rows.save(this.rows.create({ userId, data }));
  }

  getAll(userId: number) {
    return this.rows.find({ where: { userId } });
  }

  async getOne(id: number, userId: number) {
    const row = await this.rows.findOneBy({ id, userId });
    if (!row) throw new NotFoundException('Данные не найдены');
    return row;
  }

  async update(id: number, userId: number, data: any) {
    const row = await this.getOne(id, userId);
    row.data = data;
    return this.rows.save(row);
  }

  async delete(id: number, userId: number) {
    const r = await this.rows.delete({ id, userId });
    if (r.affected == 0) {
      throw new NotFoundException('Данные не найдены');
    }
  }
}
