import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { AccountService } from '../../../logic/account/account.service';

type RequestWithUserId = Request & { userId?: number };

@Injectable()
export class BlockUserGuard implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUserId>();
    const userId = Number(req.userId || req.headers['x-user-id']);

    if (!userId) {
      return true;
    }

    const blocked = await this.accountService.isUserBlocked(userId);
    if (blocked) {
      throw new ForbiddenException('Пользователь заблокирован');
    }

    return true;
  }
}
