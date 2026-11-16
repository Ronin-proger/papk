import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { UserDataService } from './user-data.service';

@Module({
  providers: [
    UserDataService,
    {
      provide: Pool,
      useFactory: () => {
        return new Pool({
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT) || 5433,
          user: process.env.DB_USER || 'user',
          password: process.env.DB_PASS || 'password',
          database: process.env.DB_NAME || 'users_db',
        });
      },
    },
  ],
  exports: [UserDataService],
})
export class UserDataModule {}
