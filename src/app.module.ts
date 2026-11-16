import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountDataModule } from './data/account-data/account-data.module';
import { UserDataModule } from './data/user-data/user-data.module';
import { EventsModule } from './events/events.module';
import { AccountHttpModule } from './http/account-http/account-http.module';
import { HttpExceptionFilter } from './http/account-http/http-exception/http-exception.filter';
import { UserHttpModule } from './http/user-http/user-http.module';
import { AccountLogicModule } from './logic/account-logic/account-logic.module';
import { UserLogicModule } from './logic/user-logic/user-logic.module';

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
          synchronize: true,
        };
      },
    }),
    UserDataModule,
    AccountDataModule,
    EventsModule,
    UserLogicModule,
    AccountLogicModule,
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
