import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Business } from './business.entity';
import { ProductServiceToCategory } from './product.service.to.category.entity';
import { ProductServiceImage } from '.';
@Entity()
export class ProductService {
  constructor(
    businessId: string,
    name: string,
    type: string,
    description: string,
    price: number,
    psCategories: ProductServiceToCategory[],
    psImages?: ProductServiceImage[],
  ) {
    this.businessId = businessId;
    this.name = name;
    this.type = type;
    this.description = description;
    this.price = price;
    this.productServiceToCategories = psCategories;
    this.productServiceImages = psImages;
  }

  @PrimaryColumn({ type: 'character varying', length: 50, name: 'business_id' })
  businessId: string;

  @PrimaryColumn({ type: 'character varying', length: 100, name: 'name' })
  name: string;

  @Column({ type: 'character varying', length: 20, name: 'type' })
  type: string;

  @Column({ type: 'character varying', length: 2500, name: 'description' })
  description: string;

  @Column({ type: 'numeric', name: 'price' })
  price: number;

  @ManyToOne(() => Business, (business) => business.productServices)
  @JoinColumn({ name: 'business_id' })
  business: Business;

  @OneToMany(() => ProductServiceToCategory, (psCat) => psCat.productService)
  productServiceToCategories: ProductServiceToCategory[];

  @OneToMany(() => ProductServiceImage, (psImages) => psImages.productService)
  productServiceImages: ProductServiceImage[];
}
