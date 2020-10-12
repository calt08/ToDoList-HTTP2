import {MigrationInterface, QueryRunner} from "typeorm";

export class versionColumn1599703833962 implements MigrationInterface {
    name = 'versionColumn1599703833962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "status" boolean NOT NULL, "dueDate" datetime NOT NULL, "userId" integer, "version" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_item"("id", "description", "status", "dueDate", "userId", "version") SELECT "id", "description", "status", "dueDate", "userId", "updatedAt" FROM "item"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`ALTER TABLE "temporary_item" RENAME TO "item"`);
        await queryRunner.query(`CREATE TABLE "temporary_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "status" boolean NOT NULL, "dueDate" datetime NOT NULL, "userId" integer, "version" integer NOT NULL, CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_item"("id", "description", "status", "dueDate", "userId", "version") SELECT "id", "description", "status", "dueDate", "userId", "version" FROM "item"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`ALTER TABLE "temporary_item" RENAME TO "item"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" RENAME TO "temporary_item"`);
        await queryRunner.query(`CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "status" boolean NOT NULL, "dueDate" datetime NOT NULL, "userId" integer, "version" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "item"("id", "description", "status", "dueDate", "userId", "version") SELECT "id", "description", "status", "dueDate", "userId", "version" FROM "temporary_item"`);
        await queryRunner.query(`DROP TABLE "temporary_item"`);
        await queryRunner.query(`ALTER TABLE "item" RENAME TO "temporary_item"`);
        await queryRunner.query(`CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "status" boolean NOT NULL, "dueDate" datetime NOT NULL, "userId" integer, "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "item"("id", "description", "status", "dueDate", "userId", "updatedAt") SELECT "id", "description", "status", "dueDate", "userId", "version" FROM "temporary_item"`);
        await queryRunner.query(`DROP TABLE "temporary_item"`);
    }

}
