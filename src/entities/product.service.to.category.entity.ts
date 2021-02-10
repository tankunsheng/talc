import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductService } from './product.service.entity';
import { Category } from './category.entity';
@Entity()
export class ProductServiceToCategory {
  constructor(businessId: string, productServiceName: string, catName: string) {
    this.businessId = businessId;
    this.productServiceName = productServiceName;
    this.catName = catName;
  }
  @PrimaryColumn({ type: 'character varying', length: 50, name: 'business_id' })
  businessId: string;

  @PrimaryColumn({ type: 'character varying', length: 100, name: 'ps_name' })
  productServiceName: string;

  @PrimaryColumn({ type: 'character varying', length: 50, name: 'cat_name' })
  catName: string;

  @ManyToOne(
    () => ProductService,
    (productService) => productService.productServiceToCategories,
  )
  @JoinColumn([
    { name: 'business_id', referencedColumnName: 'businessId' },
    { name: 'ps_name', referencedColumnName: 'name' },
  ])
  productService: ProductService;

  @ManyToOne(() => Category, (category) => category.productServiceToCategories)
  @JoinColumn({ name: 'cat_name' })
  category: Category;
}
