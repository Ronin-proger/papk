import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AccountModule } from '../../logic/account/account.module';
import { UserModule } from '../../logic/user/user.module';
import { BlockUserGuard } from './block-user/block-user.guard';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UserHttpController } from './user-http.controller';

@Module({
  imports: [UserModule, AccountModule],
  controllers: [UserHttpController],
  providers: [BlockUserGuard],
})
export class UserHttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
