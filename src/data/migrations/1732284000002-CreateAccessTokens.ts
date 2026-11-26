import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccessTokens1732284000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS access_tokens (
        id SERIAL PRIMARY KEY,
        "userId" integer NOT NULL,
        "accessKey" varchar NOT NULL UNIQUE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS access_tokens
    `);
  }
}
