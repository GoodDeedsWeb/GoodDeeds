import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714898331913 implements MigrationInterface {
  name = 'Migration1714898331913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "UsersFriends" ("UserId" integer NOT NULL, "FriendId" integer NOT NULL, CONSTRAINT "PK_6e02a52365dd62706daa8266264" PRIMARY KEY ("UserId", "FriendId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "FK_5b261770df5403603980447678d" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "FK_1cb084378c893bb487ff8173f3d" FOREIGN KEY ("FriendId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "FK_1cb084378c893bb487ff8173f3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "FK_5b261770df5403603980447678d"`,
    );
    await queryRunner.query(`DROP TABLE "UsersFriends"`);
  }
}
