import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714777731392 implements MigrationInterface {
  name = 'Migration1714777731392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Users" RENAME COLUMN "UserId" TO "Id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" RENAME CONSTRAINT "PK_aedbd821ea6272148b6a8f18ae6" TO "PK_329bb2946729a51bd2b19a5159f"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "Users_UserId_seq" RENAME TO "Users_Id_seq"`,
    );
    await queryRunner.query(
      `CREATE TABLE "GoodDeeds" ("Id" SERIAL NOT NULL, "DeedInfo" character varying NOT NULL, CONSTRAINT "PK_b34960d7c2e322e123e285c9e2e" PRIMARY KEY ("Id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "GoodDeesdUsers" ("UserId" integer NOT NULL, "GoodDeedId" integer NOT NULL, CONSTRAINT "PK_d68152248fc7b08b1919e759c17" PRIMARY KEY ("UserId", "GoodDeedId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "GoodDeesdUsers" ADD CONSTRAINT "FK_473ab43a749a9363c6c831d9839" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "GoodDeesdUsers" ADD CONSTRAINT "FK_4419c69cea0bd20a6fef13faed4" FOREIGN KEY ("GoodDeedId") REFERENCES "GoodDeeds"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "GoodDeesdUsers" DROP CONSTRAINT "FK_4419c69cea0bd20a6fef13faed4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "GoodDeesdUsers" DROP CONSTRAINT "FK_473ab43a749a9363c6c831d9839"`,
    );
    await queryRunner.query(`DROP TABLE "GoodDeesdUsers"`);
    await queryRunner.query(`DROP TABLE "GoodDeeds"`);
    await queryRunner.query(
      `ALTER SEQUENCE "Users_Id_seq" RENAME TO "Users_UserId_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" RENAME CONSTRAINT "PK_329bb2946729a51bd2b19a5159f" TO "PK_aedbd821ea6272148b6a8f18ae6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" RENAME COLUMN "Id" TO "UserId"`,
    );
  }
}
