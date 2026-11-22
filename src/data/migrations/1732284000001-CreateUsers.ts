import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1732284000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('users');
    if (!hasTable) {
      await queryRunner.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          blocked boolean NOT NULL DEFAULT false
        )
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('users');
    if (hasTable) {
      await queryRunner.query(`DROP TABLE users`);
    }
  }
}
