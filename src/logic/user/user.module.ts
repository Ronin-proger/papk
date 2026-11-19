import { Module } from '@nestjs/common';
import { UsersModule } from '../../data/user/user.module';
import { EventsModule } from '../../events/events.module';
import { UserService } from './user.service';

@Module({
  imports: [UsersModule, EventsModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
