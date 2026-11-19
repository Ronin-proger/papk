import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../data/user/users.repository';
import { EventsService } from '../../events/events.service';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly eventsService: EventsService,
  ) {}

  getAllUsers() {
    return this.usersRepository.getAllUsers();
  }

  getUserById(id: number) {
    return this.usersRepository.getUserById(id);
  }

  getUserByName(name: string) {
    return this.usersRepository.getUserByName(name);
  }

  async createUser(name: string) {
    const user = await this.usersRepository.createUser(name);
    this.eventsService.emit('user_created', user);
    return user;
  }

  updateUser(id: number, name: string) {
    return this.usersRepository.updateUser(id, name);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteUser(id);
  }

  async getOrCreateByLogin(login: string) {
    const existing = await this.usersRepository.findByName(login);
    if (existing) {
      return existing;
    }
    return this.usersRepository.createUser(login);
  }

  isBlocked(userId: number) {
    return this.usersRepository.isBlocked(userId);
  }

  setBlocked(userId: number, blocked: boolean) {
    return this.usersRepository.setBlocked(userId, blocked);
  }
}
