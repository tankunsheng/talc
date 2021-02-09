import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductService } from './product.service.entity';
import { Category } from './category.entity';
@Entity()
export class ProductServiceToCategory {
  @PrimaryColumn({ type: 'character varying', length: 50, name: 'business_id' })
  businessId: string;

  @PrimaryColumn({ type: 'character varying', length: 100, name: 'name' })
  name: string;

  @PrimaryColumn({ type: 'character varying', length: 50, name: 'category' })
  catName: string;

  @ManyToOne(
    () => ProductService,
    (productService) => productService.productServiceToCategories,
  )
  @JoinColumn([
    { name: 'business_id', referencedColumnName: 'businessId' },
    { name: 'name', referencedColumnName: 'name' },
  ])
  productService: ProductService;

  @ManyToOne(() => Category, (category) => category.productServiceToCategories)
  @JoinColumn({ name: 'name' })
  category: Category;
}
