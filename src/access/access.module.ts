import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKeyMiddleware } from './access-key/access-key.middleware';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { AccessToken } from './entities/access-token.entity';
import { UserData } from './entities/user-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessToken, UserData])],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessKeyMiddleware)
      .forRoutes(
        { path: 'api/v1/data', method: RequestMethod.ALL },
        { path: 'api/v1/data/:id', method: RequestMethod.ALL },
      );
  }
}
