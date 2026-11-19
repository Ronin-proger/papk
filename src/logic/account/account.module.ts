import { Module } from '@nestjs/common';
import { AccessTokenModule } from '../../data/access-token/access-token.module';
import { JsonRecordModule } from '../../data/json-record/json-record.module';
import { EventsModule } from '../../events/events.module';
import { UserModule } from '../user/user.module';
import { AccountService } from './account.service';

@Module({
  imports: [AccessTokenModule, JsonRecordModule, UserModule, EventsModule],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
