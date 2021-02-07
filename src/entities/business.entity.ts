import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Business {
  @PrimaryColumn({ type: 'character varying', length: 50, name: 'business_id' })
  businessId: string;

  @Column({ type: 'character varying', length: 100, name: 'name' })
  name: string;

  @Column({ type: 'character varying', length: 500, name: 'description' })
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
}
