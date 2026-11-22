import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountHttpModule } from './http/account-http/account-http.module';
import { HttpExceptionFilter } from './http/account-http/http-exception/http-exception.filter';
import { UserHttpModule } from './http/user-http/user-http.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('DB_HOST') || 'localhost',
          port: parseInt(config.get('DB_PORT') || '5433', 10),
          username: config.get('DB_USER') || 'user',
          password: config.get('DB_PASS') || 'password',
          database: config.get('DB_NAME') || 'users_db',
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
    UserHttpModule,
    AccountHttpModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
