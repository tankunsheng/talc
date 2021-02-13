import { MigrationInterface, QueryRunner } from 'typeorm';
import { Category, User } from '../src/entities';

export class seedCategory1613201847442 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories: Category[] = [
      new Category('Funeral Director', 'Funeral Director'),
      new Category('Legal Services', 'Legal Services'),
      new Category('Venue Rental', 'Venue Rental'),
      new Category('Catering', 'Catering'),
    ];
    const users: User[] = [
      new User(
        '5fee7926-f987-44b9-baac-762051353883',
        'bp',
        'talc_business',
        'thedeveloperdiaries@gmail.com',
        Date.now(),
      ),
      new User(
        '428920fd-5c9f-414a-8c98-d335bc885cad',
        'user',
        'talc_user',
        'thedeveloperdiaries@gmail.com',
        Date.now(),
      ),
    ];
    await queryRunner.manager.insert('category', categories);
    await queryRunner.manager.insert('user', users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE category cascade`);
  }
}
