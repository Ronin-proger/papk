import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers() { 
    return this.usersRepository.getAllUsers(); 
  }
  
  async getUserById(id: number) { 
    return this.usersRepository.getUserById(id); 
  }
  
  async getUserByName(name: string) { 
    return this.usersRepository.getUserByName(name); 
  }
  
  async createUser(name: string) { 
    return this.usersRepository.createUser(name); 
  }
  
  async updateUser(id: number, name: string) { 
    return this.usersRepository.updateUser(id, name); 
  }
  
  async deleteUser(id: number) { 
    return this.usersRepository.deleteUser(id); 
  }
}