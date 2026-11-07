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
    let names: string = '';
    for (let i = 0; i < UsersRepository.count; i++) {
      names += UsersRepository.mapa.get(i) + ', ';
    }
    return names;
  }

  getUserByID(id: number) {
    return UsersRepository.mapa.get(id);
  }

  createUser(name: string) {
    UsersRepository.mapa.set(UsersRepository.count, name);
    UsersRepository.count += 1;
  }
}
