import { Module } from '@nestjs/common';
import { AccessTokenModule } from '../../data/access-token/access-token.module';
import { UserDataModule } from '../../data/user-data/user-data.module';
import { EventsModule } from '../../events/events.module';
import { UserModule } from '../user/user.module';
import { AccountService } from './account.service';

@Module({
  imports: [AccessTokenModule, UserDataModule, UserModule, EventsModule],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
