import { Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';

type UserRow = {
  id: number;
  name: string;
  blocked?: boolean;
};

@Injectable()
export class UsersRepository {
  constructor(private readonly pool: Pool) {}

  async findByName(name: string) {
    const res = await this.pool.query<UserRow>(
      'SELECT id, name, blocked FROM users WHERE name = $1',
      [name],
    );
    return res.rows[0] ?? null;
  }

  async getAllUsers() {
    const res = await this.pool.query<UserRow>('SELECT * FROM users');
    return res.rows.map((u) => u.name);
  }

  async getUserById(id: number) {
    const res = await this.pool.query<UserRow>(
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
    const u = await this.findByName(name);
    if (!u) {
      throw new NotFoundException('Пользователь не найден');
    }
    return `Это пользователь ${u.name}, найденный по имени = ${name}`;
  }

  async createUser(name: string) {
    const res = await this.pool.query<UserRow>(
      'INSERT INTO users (name) VALUES ($1) RETURNING id, name, blocked',
      [name],
    );
    return res.rows[0];
  }

  async updateUser(id: number, name: string) {
    const res = await this.pool.query<UserRow>(
      'UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, blocked',
      [name, id],
    );
    return res.rows[0];
  }

  async deleteUser(id: number) {
    await this.pool.query('DELETE FROM users WHERE id = $1', [id]);
  }

  async isBlocked(userId: number) {
    const res = await this.pool.query<UserRow>(
      'SELECT blocked FROM users WHERE id = $1',
      [userId],
    );
    return res.rows[0]?.blocked === true;
  }

  async setBlocked(userId: number, blocked: boolean) {
    await this.pool.query('UPDATE users SET blocked = $1 WHERE id = $2', [
      blocked,
      userId,
    ]);
  }
}
