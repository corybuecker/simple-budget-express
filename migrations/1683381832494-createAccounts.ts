import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateAccounts1683381832494 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'create table accounts (' +
        'id uuid not null primary key,' +
        'name character varying(255) not null,' +
        'amount numeric not null,' +
        'debt boolean default false not null,' +
        'user_id uuid not null' +
        ');'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table accounts;')
  }
}
