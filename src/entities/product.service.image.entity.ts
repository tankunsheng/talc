import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductService } from './product.service.entity';
@Entity()
export class ProductServiceImage {
  constructor(
    businessId: string,
    productServiceName: string,
    imageLink: string,
  ) {
    this.businessId = businessId;
    this.productServiceName = productServiceName;
    this.imageLink = imageLink;
  }

  @PrimaryColumn({ type: 'character varying', length: 100, name: 'ps_name' })
  productServiceName: string;

  @PrimaryColumn({ type: 'character varying', length: 500, name: 'image_link' })
  imageLink: string;

  @PrimaryColumn({ type: 'character varying', length: 50, name: 'business_id' })
  businessId: string;

  @ManyToOne(
    () => ProductService,
    (productService) => productService.productServiceImages,
  )
  @JoinColumn([
    { name: 'business_id', referencedColumnName: 'businessId' },
    { name: 'ps_name', referencedColumnName: 'name' },
  ])
  productService: ProductService;
}
