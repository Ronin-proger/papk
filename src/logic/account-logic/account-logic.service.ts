import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AccountDataService } from '../../data/account-data/account-data.service';
import { EventsService } from '../../events/events.service';

@Injectable()
export class AccountLogicService {
  constructor(
    private accountData: AccountDataService,
    private events: EventsService,
  ) {}

  async auth(dto: any) {
    let userId = 0;
    for (let i = 0; i < dto.login.length; i++) {
      userId = userId + dto.login.charCodeAt(i);
    }

    const key = randomUUID();

    try {
      await this.accountData.saveToken(userId, key);
    } catch (err: any) {
      if (err.code === '23505') {
        throw new ConflictException('Такой ключ уже есть');
      }
      throw err;
    }

    this.events.emit('auth', userId);
    return { access_key: key };
  }

  async getUserIdByKey(key: string) {
    const userId = await this.accountData.getUserId(key);
    if (!userId) {
      throw new UnauthorizedException('Неверный access key');
    }
    return userId;
  }

  createData(userId: number, dto: any) {
    return this.accountData.addData(userId, dto.data);
  }

  findAll(userId: number) {
    return this.accountData.getAll(userId);
  }

  findOne(id: number, userId: number) {
    return this.accountData.getOne(id, userId);
  }

  update(id: number, userId: number, dto: any) {
    return this.accountData.update(id, userId, dto.data);
  }

  remove(id: number, userId: number) {
    return this.accountData.delete(id, userId);
  }
}
