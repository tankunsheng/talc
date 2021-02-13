import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Business } from './business.entity';
@Entity()
export class User {
  constructor(
    sub: string,
    role: string,
    username: string,
    email: string,
    datetimeJoined: number,
  ) {
    this.sub = sub;
    this.role = role;
    this.username = username;
    this.email = email;
    this.datetimeJoined = datetimeJoined;
  }

  @PrimaryColumn({ type: 'character varying', length: 50, name: 'sub' })
  sub: string;

  @Column({ type: 'character varying', length: 50, name: 'username' })
  username: string;

  @Column({ type: 'character varying', length: 50, name: 'role' })
  role: string;

  @Column({ type: 'character varying', length: 100, name: 'email' })
  email: string;

  @Column({
    type: 'character varying',
    length: 250,
    name: 'address',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'character varying',
    length: 1,
    name: 'gender',
    nullable: true,
  })
  gender: string;

  @Column({ type: 'bigint', name: 'dob', nullable: true })
  dob: number;

  @Column({
    type: 'character varying',
    length: 20,
    name: 'hp_no',
    nullable: true,
  })
  hpNo: string;

  @Column({ type: 'bigint', name: 'datetime_joined' })
  datetimeJoined: number;

  @ManyToOne(() => Business, (business) => business.users)
  @JoinColumn({ name: 'business_id' })
  business: Business;
}
