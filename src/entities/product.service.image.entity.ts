import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductService } from './product.service.entity';
import { Category } from './category.entity';
@Entity()
export class ProductServiceImage {
  @PrimaryColumn({ type: 'character varying', length: 50, name: 'image_id' })
  imageId: string;

  @Column({ type: 'character varying', length: 100, name: 'ps_name' })
  productServiceName: string;

  @Column({ type: 'character varying', length: 500, name: 'image_link' })
  imageLink: string;

  @Column({ type: 'character varying', length: 50, name: 'business_id' })
  businessId: string;

  @ManyToOne(
    () => ProductService,
    (productService) => productService.productServiceToCategories,
  )
  @JoinColumn([
    { name: 'business_id', referencedColumnName: 'businessId' },
    { name: 'ps_name', referencedColumnName: 'name' },
  ])
  productService: ProductService;
}
