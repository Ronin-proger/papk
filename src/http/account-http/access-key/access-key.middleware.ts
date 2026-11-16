import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { AccountLogicService } from '../../../logic/account-logic/account-logic.service';

@Injectable()
export class AccessKeyMiddleware implements NestMiddleware {
  constructor(private accountLogic: AccountLogicService) {}

  async use(req: any, res: any, next: () => void) {
    const key = req.headers['x-user-access-key'];
    if (!key) {
      throw new UnauthorizedException('Нет access key');
    }
    req.userId = await this.accountLogic.getUserIdByKey(key);
    next();
  }
}
