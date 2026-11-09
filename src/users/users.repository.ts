import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  static mapa: Map<number, string> = new Map();
  static count: number = 0;

  constructor() {
    this.createUser('petya');
    this.createUser('vasya');
    this.createUser('sanya');
  }

  getUsers() {
    let users = [];
    for (let i = 0; i < UsersRepository.count; i++) {
      if (UsersRepository.mapa.has(i)) {
        users.push({ id: i, name: UsersRepository.mapa.get(i) });
      }
    }
    return users;
  }

  getUserByID(id: number) {
    return UsersRepository.mapa.get(id);
  }

  createUser(name: string) {
    UsersRepository.mapa.set(UsersRepository.count, name);
    UsersRepository.count += 1;
  }

  updateUser(id: number, name: string) {
    UsersRepository.mapa.set(id, name);
  }

  deleteUser(id: number) {
    UsersRepository.mapa.delete(id);
  }
}
