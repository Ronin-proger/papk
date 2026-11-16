import { Module } from '@nestjs/common';
import { UserDataModule } from '../../data/user-data/user-data.module';
import { EventsModule } from '../../events/events.module';
import { UserLogicService } from './user-logic.service';

@Module({
  imports: [UserDataModule, EventsModule],
  providers: [UserLogicService],
  exports: [UserLogicService],
})
export class UserLogicModule {}
