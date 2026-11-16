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
    const id = Number(req.userId || req.headers['x-user-id']);
    const blockedUsers = [2, 5];

    if (id && blockedUsers.includes(id)) {
      throw new ForbiddenException('Пользователь заблокирован');
    }

    return true;
  }
}
