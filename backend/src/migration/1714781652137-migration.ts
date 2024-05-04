import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714781652137 implements MigrationInterface {
  name = 'Migration1714781652137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "UsersGoodDeeds" ("UserId" integer NOT NULL, "GoodDeedId" integer NOT NULL, CONSTRAINT "PK_864c2a0355487068967aff97951" PRIMARY KEY ("UserId", "GoodDeedId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersGoodDeeds" ADD CONSTRAINT "FK_424eef901cc84338527b3e92ea7" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersGoodDeeds" ADD CONSTRAINT "FK_546c7a611f5811084db3e76ac72" FOREIGN KEY ("GoodDeedId") REFERENCES "GoodDeeds"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "UsersGoodDeeds" DROP CONSTRAINT "FK_546c7a611f5811084db3e76ac72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersGoodDeeds" DROP CONSTRAINT "FK_424eef901cc84338527b3e92ea7"`,
    );
    await queryRunner.query(`DROP TABLE "UsersGoodDeeds"`);
  }
}
