import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714772384683 implements MigrationInterface {
  name = 'Migration1714772384683';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "Users"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Users" RENAME TO "users"`);
  }
}
