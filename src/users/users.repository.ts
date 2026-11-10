import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async getUsers() {
    return this.repo.find();
  }

  async getUserByID(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async createUser(name: string) {
    const user = this.repo.create({ name });
    return this.repo.save(user);
  }

  async updateUser(id: number, name: string) {
    await this.repo.update(id, { name });
  }

  async deleteUser(id: number) {
    await this.repo.delete(id);
  }
}