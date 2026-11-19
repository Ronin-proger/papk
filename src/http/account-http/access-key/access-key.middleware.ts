import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AccountService } from '../../../logic/account/account.service';

type RequestWithUserId = Request & { userId?: number };

@Injectable()
export class AccessKeyMiddleware implements NestMiddleware {
  constructor(private readonly accountService: AccountService) {}

  async use(req: RequestWithUserId, res: Response, next: NextFunction) {
    const key = req.headers['x-user-access-key'];
    if (!key || Array.isArray(key)) {
      throw new UnauthorizedException('Нет access key');
    }

    req.userId = await this.accountService.getUserIdByKey(key);
    next();
  }
}
