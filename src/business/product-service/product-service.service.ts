import { Injectable } from '@nestjs/common';
import { ProductService, ProductServiceToCategory } from '../../entities';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductServiceService {
  constructor(
    @InjectRepository(ProductService)
    private productServiceRepo: Repository<ProductService>,
    @InjectRepository(ProductServiceToCategory)
    private psToCategory: Repository<ProductServiceToCategory>,
  ) {}

  async listAllByCategory(
    category: string,
  ): Promise<ProductServiceToCategory[]> {
    return this.psToCategory.find({
      where: { catName: category },
    });
  }

  async createProductService(
    productService: ProductService,
  ): Promise<ProductService | boolean> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let success = false;
    try {
      await queryRunner.manager.save(productService);
      console.log(productService.productServiceToCategories);
      await queryRunner.manager.save(productService.productServiceToCategories);
      await queryRunner.commitTransaction();
      success = true;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return success ? productService : false;
  }
}
