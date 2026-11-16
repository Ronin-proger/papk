import { Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class UserDataService {
  constructor(private pool: Pool) {}

  async getAllUsers() {
    const res = await this.pool.query('SELECT * FROM users');
    const names = res.rows.map((u) => u.name);
    return names;
  }

  async getUserById(id: number) {
    const res = await this.pool.query(
      'SELECT id, name FROM users WHERE id = $1',
      [id],
    );
    const u = res.rows[0];
    if (!u) {
      throw new NotFoundException('Пользователь не найден');
    }
    return `Это пользователь ${u.name}, найденный по id = ${id}`;
  }

  async getUserByName(name: string) {
    const res = await this.pool.query(
      'SELECT id, name FROM users WHERE name = $1',
      [name],
    );
    if (res.rows.length === 0) {
      throw new NotFoundException('Пользователь не найден');
    }
    return `Это пользователь ${res.rows[0].name}, найденный по имени = ${name}`;
  }

  async createUser(name: string) {
    const res = await this.pool.query(
      'INSERT INTO users (name) VALUES ($1) RETURNING *',
      [name],
    );
    return res.rows[0];
  }

  async updateUser(id: number, name: string) {
    const res = await this.pool.query(
      'UPDATE users SET name = $1 WHERE id = $2 RETURNING *',
      [name, id],
    );
    return res.rows[0];
  }

  async deleteUser(id: number) {
    await this.pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
}
