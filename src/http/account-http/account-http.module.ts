import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AccountModule } from '../../logic/account/account.module';
import { BlockUserGuard } from '../user-http/block-user/block-user.guard';
import { AccessKeyMiddleware } from './access-key/access-key.middleware';
import { AccountHttpController } from './account-http.controller';

@Module({
  imports: [AccountModule],
  controllers: [AccountHttpController],
  providers: [AccessKeyMiddleware, BlockUserGuard],
})
export class AccountHttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessKeyMiddleware).forRoutes(
      { path: 'api/v1/data', method: RequestMethod.ALL },
      { path: 'api/v1/data/:id', method: RequestMethod.ALL },
    );
  }
}
