import { Module } from '@nestjs/common';
import { MemorialController } from './memorial/memorial.controller';
import { MemorialService } from './memorial/memorial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memorial } from '../entities/memorial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Memorial])],
  controllers: [MemorialController],
  providers: [MemorialService],
})
export class UserModule {}
