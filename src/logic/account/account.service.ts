import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AccessTokenService } from '../../data/access-token/access-token.service';
import { UserDataService } from '../../data/user-data/user-data.service';
import { EventsService } from '../../events/events.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly userDataService: UserDataService,
    private readonly eventsService: EventsService,
    private readonly userService: UserService,
  ) {}

  async auth(login: string) {
    const user = await this.userService.getOrCreateByLogin(login);
    const accessKey = randomUUID();

    try {
      await this.accessTokenService.saveToken(user.id, accessKey);
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code?: string }).code === '23505'
      ) {
        throw new ConflictException('Такой ключ уже есть');
      }
      throw err;
    }

    this.eventsService.emit('auth', user.id);
    return { access_key: accessKey };
  }

  async getUserIdByKey(accessKey: string) {
    const userId = await this.accessTokenService.getUserId(accessKey);
    if (userId === null || userId === undefined) {
      throw new UnauthorizedException('Неверный access key');
    }
    return userId;
  }

  isUserBlocked(userId: number) {
    return this.userService.isBlocked(userId);
  }

  createData(userId: number, data: Record<string, unknown>) {
    return this.userDataService.add(userId, data);
  }

  findAll(userId: number) {
    return this.userDataService.getAll(userId);
  }

  findOne(id: number, userId: number) {
    return this.userDataService.getOne(id, userId);
  }

  update(id: number, userId: number, data: Record<string, unknown>) {
    return this.userDataService.update(id, userId, data);
  }

  remove(id: number, userId: number) {
    return this.userDataService.remove(id, userId);
  }
}

