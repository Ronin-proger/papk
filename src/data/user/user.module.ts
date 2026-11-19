import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { UsersRepository } from './users.repository';

@Module({
  providers: [
    UsersRepository,
    {
      provide: Pool,
      useFactory: () => {
        return new Pool({
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5433', 10),
          user: process.env.DB_USER || 'user',
          password: process.env.DB_PASS || 'password',
          database: process.env.DB_NAME || 'users_db',
        });
      },
    },
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
