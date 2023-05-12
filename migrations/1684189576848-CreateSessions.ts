import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSessions1684189576848 implements MigrationInterface {
    name = 'CreateSessions1684189576848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("expiredAt" bigint NOT NULL, "id" varchar(255) PRIMARY KEY NOT NULL, "json" text NOT NULL, "destroyedAt" datetime)`);
        await queryRunner.query(`CREATE INDEX "IDX_28c5d1d16da7908c97c9bc2f74" ON "session" ("expiredAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_28c5d1d16da7908c97c9bc2f74"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
