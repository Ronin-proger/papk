import { Injectable, NotFoundException } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

type User = {
  id: number;
  name: string;
};

@Injectable()
export class UsersRepository {
  constructor(readonly pool: Pool) {}

  async getAllUsers(): Promise<string[]> {
    const result: QueryResult<User> = await this.pool.query<User>('SELECT * FROM users');
    return result.rows.map((row) => row.name);
  }

  async getUserById(userId: number): Promise<string> {
    const result: QueryResult<User> = await this.pool.query<User>(
      `SELECT id, name FROM users WHERE id = $1`,
      [userId],
    );
    const user = result.rows[0]?.name;
    if (user === undefined) {
      throw new NotFoundException('Пользователь не найден');
    }
    return `Это пользователь ${user}, найденный по id = ${userId}`;
  }

  async getUserByName(name: string): Promise<string> {
    const result: QueryResult<User> = await this.pool.query<User>(
      `SELECT id, name FROM users WHERE name = $1`,
      [name],
    );
    const user = result.rows[0]?.name;
    if (user === undefined) {
      throw new NotFoundException('Пользователь не найден');
    }
    return `Это пользователь ${user}, найденный по имени = ${name}`;
  }

  async createUser(name: string): Promise<User> {
    const result = await this.pool.query(
      `INSERT INTO users (name) VALUES ($1) RETURNING *`,
      [name],
    );
    return result.rows[0];
  }

  async updateUser(id: number, name: string): Promise<User> {
    const result = await this.pool.query(
      `UPDATE users SET name = $1 WHERE id = $2 RETURNING *`,
      [name, id],
    );
    return result.rows[0];
  }

  async deleteUser(id: number): Promise<void> {
    await this.pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  }
}