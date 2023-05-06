import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsers1683383482272 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'create table users (' +
        'id uuid not null primary key,' +
        'email character varying(255) not null' +
        ');'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table users;')
  }
}
