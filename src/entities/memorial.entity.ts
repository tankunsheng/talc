import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from '.';
@Entity()
export class Memorial {
  constructor(
    memorialId: string,
    name: string,
    description: string,
    dateOfPassing: Date,
    datetimePosted: Date,
    wakeLocation: string,
    wakeStartDatetime: Date,
    wakeEndDatetime: Date,
  ) {
    this.memorialId = memorialId;
    this.name = name;
    this.description = description;
    this.dateOfPassing = dateOfPassing;
    this.datetimePosted = datetimePosted;
    this.wakeLocation = wakeLocation;
    this.wakeStartDatetime = wakeStartDatetime;
    this.wakeEndDatetime = wakeEndDatetime;
  }
  @PrimaryColumn({ type: 'character varying', length: 50, name: 'memorial_id' })
  memorialId: string;

  @Column({ type: 'character varying', length: 100, name: 'name' })
  name: string;

  @Column({ type: 'character varying', length: 2500, name: 'description' })
  description: string;

  @Column({ type: 'date', name: 'date_of_passing' })
  dateOfPassing: Date;

  @Column({ type: 'timestamp', name: 'date_time_posted' })
  datetimePosted: Date;

  @Column({ type: 'character varying', length: 100, name: 'wake_location' })
  wakeLocation: string;

  @Column({ type: 'timestamp', name: 'wake_start_datetime' })
  wakeStartDatetime: Date;

  @Column({ type: 'timestamp', name: 'wake_end_datetime' })
  wakeEndDatetime: Date;

  @ManyToOne(() => User, (user) => user.memorials)
  @JoinColumn([{ name: 'user_sub' }])
  user: User;
}
