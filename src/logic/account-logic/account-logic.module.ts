import { Module } from '@nestjs/common';
import { AccountDataModule } from '../../data/account-data/account-data.module';
import { EventsModule } from '../../events/events.module';
import { UserLogicModule } from '../user-logic/user-logic.module';
import { AccountLogicService } from './account-logic.service';

@Module({
  imports: [AccountDataModule, UserLogicModule, EventsModule],
  providers: [AccountLogicService],
  exports: [AccountLogicService],
})
export class AccountLogicModule {}
