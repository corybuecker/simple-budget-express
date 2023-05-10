import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTables1683683643476 implements MigrationInterface {
    name = 'InitialTables1683683643476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "account" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "amount" integer NOT NULL, "debt" boolean NOT NULL DEFAULT (0), "userId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_account" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "amount" integer NOT NULL, "debt" boolean NOT NULL DEFAULT (0), "userId" varchar NOT NULL, CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_account"("id", "name", "amount", "debt", "userId") SELECT "id", "name", "amount", "debt", "userId" FROM "account"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`ALTER TABLE "temporary_account" RENAME TO "account"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" RENAME TO "temporary_account"`);
        await queryRunner.query(`CREATE TABLE "account" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "amount" integer NOT NULL, "debt" boolean NOT NULL DEFAULT (0), "userId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "account"("id", "name", "amount", "debt", "userId") SELECT "id", "name", "amount", "debt", "userId" FROM "temporary_account"`);
        await queryRunner.query(`DROP TABLE "temporary_account"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
