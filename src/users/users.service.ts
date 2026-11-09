import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }

  getUserByID(id: number) {
    return this.usersRepository.getUserByID(id);
  }

  createUser(name: string) {
    this.usersRepository.createUser(name);
    return 'ok';
  }

  updateUser(id: number, name: string) {
    this.usersRepository.updateUser(id, name);
    return 'ok';
  }

  deleteUser(id: number) {
    this.usersRepository.deleteUser(id);
    return 'ok';
  }
}
