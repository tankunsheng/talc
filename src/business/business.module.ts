import { Module } from '@nestjs/common';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Business,
  User,
  ProductService,
  ProductServiceToCategory,
} from '../entities';
import { ProductServiceController } from './product-service/product-service.controller';
import { ProductServiceService } from './product-service/product-service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Business,
      User,
      ProductService,
      ProductServiceToCategory,
    ]),
  ],
  controllers: [
    ProfileController,
    BusinessController,
    ProductServiceController,
  ],
  providers: [ProfileService, ProductServiceService],
})
export class BusinessModule {}
