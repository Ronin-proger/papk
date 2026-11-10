import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

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
export class UsersModule {}