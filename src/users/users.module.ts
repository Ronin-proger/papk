import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Pool } from 'pg';
import { LoggerMiddleware } from '../common/logger/logger.middleware';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    {
      provide: Pool,
      useFactory: () => {
        return new Pool({
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT, 10) || 5433,
          user: process.env.DB_USER || 'user',
          password: process.env.DB_PASS || 'password',
          database: process.env.DB_NAME || 'users_db',
        });
      },
    },
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
