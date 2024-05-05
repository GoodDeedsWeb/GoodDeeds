import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714902221226 implements MigrationInterface {
  name = 'Migration1714902221226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" DROP CONSTRAINT "FK_9829cd7525a765f99ee05eb679d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "FK_5b261770df5403603980447678d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "FK_1cb084378c893bb487ff8173f3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" ADD CONSTRAINT "FK_9829cd7525a765f99ee05eb679d" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "FK_5b261770df5403603980447678d" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "FK_1cb084378c893bb487ff8173f3d" FOREIGN KEY ("FriendId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "FK_1cb084378c893bb487ff8173f3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "FK_5b261770df5403603980447678d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" DROP CONSTRAINT "FK_9829cd7525a765f99ee05eb679d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "FK_1cb084378c893bb487ff8173f3d" FOREIGN KEY ("FriendId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "FK_5b261770df5403603980447678d" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" ADD CONSTRAINT "FK_9829cd7525a765f99ee05eb679d" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
