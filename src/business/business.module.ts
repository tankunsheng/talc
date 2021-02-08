import { Module } from '@nestjs/common';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business, User } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Business, User])],
  controllers: [ProfileController, BusinessController],
  providers: [ProfileService]
})
export class BusinessModule {}
