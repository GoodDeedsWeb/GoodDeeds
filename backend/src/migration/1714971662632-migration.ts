import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714971662632 implements MigrationInterface {
  name = 'Migration1714971662632';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Users" ADD "Email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "UQ_884fdf47515c24dbbf6d89c2d84" UNIQUE ("Email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" DROP CONSTRAINT "FK_9829cd7525a765f99ee05eb679d"`,
    );
    await queryRunner.query(`ALTER TABLE "GoodDeeds" DROP COLUMN "UserId"`);
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" ADD "UserId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "FK_5b261770df5403603980447678d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "FK_1cb084378c893bb487ff8173f3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "PK_6e02a52365dd62706daa8266264"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "PK_1cb084378c893bb487ff8173f3d" PRIMARY KEY ("FriendId")`,
    );
    await queryRunner.query(`ALTER TABLE "UsersFriends" DROP COLUMN "UserId"`);
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD "UserId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "PK_1cb084378c893bb487ff8173f3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "PK_6e02a52365dd62706daa8266264" PRIMARY KEY ("FriendId", "UserId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "PK_6e02a52365dd62706daa8266264"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "PK_5b261770df5403603980447678d" PRIMARY KEY ("UserId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP COLUMN "FriendId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD "FriendId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "PK_5b261770df5403603980447678d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "PK_6e02a52365dd62706daa8266264" PRIMARY KEY ("UserId", "FriendId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "PK_329bb2946729a51bd2b19a5159f"`,
    );
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "Id"`);
    await queryRunner.query(
      `ALTER TABLE "Users" ADD "Id" character varying(15) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "PK_329bb2946729a51bd2b19a5159f" PRIMARY KEY ("Id")`,
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
      `ALTER TABLE "Users" DROP CONSTRAINT "PK_329bb2946729a51bd2b19a5159f"`,
    );
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "Id"`);
    await queryRunner.query(`ALTER TABLE "Users" ADD "Id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "PK_329bb2946729a51bd2b19a5159f" PRIMARY KEY ("Id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "PK_6e02a52365dd62706daa8266264"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "PK_5b261770df5403603980447678d" PRIMARY KEY ("UserId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP COLUMN "FriendId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD "FriendId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "PK_5b261770df5403603980447678d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "PK_6e02a52365dd62706daa8266264" PRIMARY KEY ("FriendId", "UserId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "PK_6e02a52365dd62706daa8266264"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "PK_1cb084378c893bb487ff8173f3d" PRIMARY KEY ("FriendId")`,
    );
    await queryRunner.query(`ALTER TABLE "UsersFriends" DROP COLUMN "UserId"`);
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD "UserId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" DROP CONSTRAINT "PK_1cb084378c893bb487ff8173f3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "PK_6e02a52365dd62706daa8266264" PRIMARY KEY ("UserId", "FriendId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "FK_1cb084378c893bb487ff8173f3d" FOREIGN KEY ("FriendId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "UsersFriends" ADD CONSTRAINT "FK_5b261770df5403603980447678d" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(`ALTER TABLE "GoodDeeds" DROP COLUMN "UserId"`);
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" ADD "UserId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "GoodDeeds" ADD CONSTRAINT "FK_9829cd7525a765f99ee05eb679d" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "Users" DROP CONSTRAINT "UQ_884fdf47515c24dbbf6d89c2d84"`,
    );
    await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "Email"`);
  }
}
