import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Business } from './business.entity';
@Entity()
export class User {
  @PrimaryColumn({ type: 'character varying', length: 50, name: 'sub' })
  sub: string;

  @Column({ type: 'character varying', length: 50, name: 'role' })
  role: string;

  @Column({ type: 'character varying', length: 100, name: 'email' })
  email: string;

  @Column({ type: 'character varying', length: 250, name: 'address' })
  address: string;

  @Column({ type: 'character varying', length: 1, name: 'gender' })
  gender: string;

  @Column({ type: 'bigint', name: 'dob' })
  dob: number;

  @Column({ type: 'character varying', length: 20, name: 'hp_no' })
  hpNo: string;

  @Column({ type: 'bigint', name: 'datetime_joined' })
  datetimeJoined: number;

  @ManyToOne(() => Business, (business) => business.businessId)
  @JoinColumn({ name: 'businessId' })
  business: Business;
}
