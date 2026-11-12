import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class BlockUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const userId = Number(req.userId || req.headers['x-user-id']);
    const blocked = [2, 5];

    if (userId && blocked.includes(userId)) {
      throw new ForbiddenException('Пользователь заблокирован');
    }

    return true;
  }
}
