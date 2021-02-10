import { MigrationInterface, QueryRunner } from 'typeorm';
import { Category } from '../src/entities';

export class seedCategory1612974872752 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories: Category[] = [
      new Category('Funeral Director', 'Funeral Director'),
      new Category('Legal Services', 'Legal Services'),
      new Category('Venue Rental', 'Venue Rental'),
      new Category('Catering', 'Catering'),
    ];
    await queryRunner.manager.insert('category', categories);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE category cascade`);
  }
}
