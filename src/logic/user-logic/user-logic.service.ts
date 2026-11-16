import { Injectable } from '@nestjs/common';
import { UserDataService } from '../../data/user-data/user-data.service';
import { EventsService } from '../../events/events.service';

@Injectable()
export class UserLogicService {
  constructor(
    private userData: UserDataService,
    private events: EventsService,
  ) {}

  getAllUsers() {
    return this.userData.getAllUsers();
  }

  getUserById(id: number) {
    return this.userData.getUserById(id);
  }

  getUserByName(name: string) {
    return this.userData.getUserByName(name);
  }

  async createUser(name: string) {
    const user = await this.userData.createUser(name);
    this.events.emit('user_created', user);
    return user;
  }

  updateUser(id: number, name: string) {
    return this.userData.updateUser(id, name);
  }

  deleteUser(id: number) {
    return this.userData.deleteUser(id);
  }
}
