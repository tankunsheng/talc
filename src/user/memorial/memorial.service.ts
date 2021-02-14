import { Injectable } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Memorial } from '../../entities/memorial.entity';

@Injectable()
export class MemorialService {
  constructor(
    @InjectRepository(Memorial) private memorialRepo: Repository<Memorial>,
  ) {}
  async createMemorialForUser(memorial: Memorial): Promise<Memorial> {
    let createdMemorial: Memorial;
    try {
      createdMemorial = await this.memorialRepo.save(memorial);
    } catch (err) {
      console.log(err);
    }
    return createdMemorial;
  }
  async listAllByDay(todayDate: Date, tmrDate: Date): Promise<Memorial[]> {
    let memorials: Memorial[];
    try {
      memorials = await this.memorialRepo.find({
        where: { datetimePosted: Between(todayDate, tmrDate) },
      });
    } catch (err) {
      console.log(err);
    }
    return memorials;
  }
}
