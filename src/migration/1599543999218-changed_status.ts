import {MigrationInterface, QueryRunner} from "typeorm";

export class changedStatus1599543999218 implements MigrationInterface {
    name = 'changedStatus1599543999218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "status" varchar NOT NULL, "dueDate" datetime NOT NULL, "userId" integer, CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_item"("id", "description", "status", "dueDate", "userId") SELECT "id", "description", "status", "dueDate", "userId" FROM "item"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`ALTER TABLE "temporary_item" RENAME TO "item"`);
        await queryRunner.query(`CREATE TABLE "temporary_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "status" boolean NOT NULL, "dueDate" datetime NOT NULL, "userId" integer, CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_item"("id", "description", "status", "dueDate", "userId") SELECT "id", "description", "status", "dueDate", "userId" FROM "item"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`ALTER TABLE "temporary_item" RENAME TO "item"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" RENAME TO "temporary_item"`);
        await queryRunner.query(`CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "status" varchar NOT NULL, "dueDate" datetime NOT NULL, "userId" integer, CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "item"("id", "description", "status", "dueDate", "userId") SELECT "id", "description", "status", "dueDate", "userId" FROM "temporary_item"`);
        await queryRunner.query(`DROP TABLE "temporary_item"`);
        await queryRunner.query(`ALTER TABLE "item" RENAME TO "temporary_item"`);
        await queryRunner.query(`CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "status" varchar NOT NULL, "dueDate" datetime NOT NULL, "userId" integer, CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "item"("id", "description", "status", "dueDate", "userId") SELECT "id", "description", "status", "dueDate", "userId" FROM "temporary_item"`);
        await queryRunner.query(`DROP TABLE "temporary_item"`);
    }

}
