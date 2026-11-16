import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from './access-token.entity';
import { AccountDataService } from './account-data.service';
import { UserData } from './user-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessToken, UserData])],
  providers: [AccountDataService],
  exports: [AccountDataService],
})
export class AccountDataModule {}
