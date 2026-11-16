import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AccountLogicModule } from '../../logic/account-logic/account-logic.module';
import { AccessKeyMiddleware } from './access-key/access-key.middleware';
import { AccountHttpController } from './account-http.controller';

@Module({
  imports: [AccountLogicModule],
  controllers: [AccountHttpController],
  providers: [AccessKeyMiddleware],
})
export class AccountHttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessKeyMiddleware).forRoutes(
      { path: 'api/v1/data', method: RequestMethod.ALL },
      { path: 'api/v1/data/:id', method: RequestMethod.ALL },
    );
  }
}
