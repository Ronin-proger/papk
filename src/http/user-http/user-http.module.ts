import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserLogicModule } from '../../logic/user-logic/user-logic.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UserHttpController } from './user-http.controller';

@Module({
  imports: [UserLogicModule],
  controllers: [UserHttpController],
})
export class UserHttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
