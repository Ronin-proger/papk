import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserData1732284000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('user_data');
    if (!hasTable) {
      await queryRunner.query(`
        CREATE TABLE user_data (
          id SERIAL PRIMARY KEY,
          "userId" integer NOT NULL,
          data jsonb NOT NULL
        )
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('user_data');
    if (hasTable) {
      await queryRunner.query(`DROP TABLE user_data`);
    }
  }
}
