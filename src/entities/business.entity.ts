import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { User } from '.';
import { ProductService } from './product.service.entity';

@Entity()
export class Business {
  constructor(
    businessId: string,
    name: string,
    description: string,
    uen: string,
    email: string,
    address: string,
    mainContactName: string,
    mainContactNumber: string,
    picture?: string,
  ) {
    this.businessId = businessId;
    this.name = name;
    this.description = description;
    this.uen = uen;
    this.email = email;
    this.address = address;
    this.mainContactNumber = mainContactNumber;
    this.mainContactName = mainContactName;
    this.picture = picture;
  }

  @PrimaryColumn({ type: 'character varying', length: 50, name: 'business_id' })
  businessId: string;

  @Column({ type: 'character varying', length: 100, name: 'name' })
  name: string;

  @Column({ type: 'character varying', length: 2500, name: 'description' })
  description: string;

  @Column({ type: 'character varying', length: 50, name: 'uen' })
  uen: string;

  @Column({ type: 'character varying', length: 50, name: 'email' })
  email: string;

  @Column({ type: 'character varying', length: 100, name: 'address' })
  address: string;

  @Column({ type: 'character varying', length: 100, name: 'main_contact_name' })
  mainContactName: string;

  @Column({
    type: 'character varying',
    length: 20,
    name: 'main_contact_number',
  })
  mainContactNumber: string;

  @Column({
    type: 'character varying',
    length: 100,
    name: 'picture',
    nullable: true,
  })
  picture: string;

  @OneToMany(() => User, (user) => user.business)
  users: User[];

  @OneToMany(
    () => ProductService,
    (productServices) => productServices.business,
  )
  productServices: ProductService[];
}
