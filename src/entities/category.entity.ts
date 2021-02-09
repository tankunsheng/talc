import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ProductServiceToCategory } from './product.service.to.category.entity';
@Entity()
export class Category {
  @PrimaryColumn({ type: 'character varying', length: 50, name: 'name' })
  name: string;

  @Column({ type: 'character varying', length: 500, name: 'description' })
  dscription: string;

  @OneToMany(() => ProductServiceToCategory, (psCat) => psCat.category)
  productServiceToCategories: ProductServiceToCategory[];
}
