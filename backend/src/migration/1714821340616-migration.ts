import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714821340616 implements MigrationInterface {
  name = 'Migration1714821340616';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "GoodDeeds" DROP COLUMN "DeedInfo"`);
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" ADD "UserId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" ADD "GoodDeep" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" ADD CONSTRAINT "FK_9829cd7525a765f99ee05eb679d" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" DROP CONSTRAINT "FK_9829cd7525a765f99ee05eb679d"`,
    );
    await queryRunner.query(`ALTER TABLE "GoodDeeds" DROP COLUMN "GoodDeep"`);
    await queryRunner.query(`ALTER TABLE "GoodDeeds" DROP COLUMN "UserId"`);
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" ADD "DeedInfo" character varying NOT NULL`,
    );
  }
}
