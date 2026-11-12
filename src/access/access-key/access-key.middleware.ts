import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { AccessService } from '../access.service';

@Injectable()
export class AccessKeyMiddleware implements NestMiddleware {
  constructor(private readonly accessService: AccessService) {}

  async use(req: any, res: any, next: () => void) {
    const key = req.headers['x-user-access-key'];
    if (!key) {
      throw new UnauthorizedException('Нет access key');
    }

    req.userId = await this.accessService.getUserIdByKey(key);
    next();
  }
}
