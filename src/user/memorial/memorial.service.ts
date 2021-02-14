import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
}
