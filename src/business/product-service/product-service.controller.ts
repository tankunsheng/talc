import {
  Controller,
  Put,
  Body,
  Get,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { productServiceDto } from '../../dto/productServiceDto';
import { ProductService, ProductServiceToCategory } from '../../entities';
import { ProductServiceService } from './product-service.service';
import { Transaction } from 'typeorm';

@Controller('business/product-service')
export class ProductServiceController {
  constructor(private productServiceService: ProductServiceService) {}
  // @Get()
  // async getProducts(@Req() req: Request) {
  //   console.log(req.user);
  //   const sub = req.user['idToken']['payload']['sub'];
  //   const businessProfile = await this.profileService.getUserBusinessProfile(
  //     sub,
  //   );
  //   return businessProfile;
  // }
  @Put()
  async putProfile(@Body() psDto: productServiceDto, @Req() req: Request) {
    console.log(psDto);
    console.log(psDto);
    const psCategories: ProductServiceToCategory[] = psDto.categories.map(
      (eachPSCat) => {
        return new ProductServiceToCategory(
          psDto.businessId,
          psDto.name,
          eachPSCat,
        );
      },
    );
    const productService: ProductService = new ProductService(
      psDto.businessId,
      psDto.name,
      psDto.type,
      psDto.description,
      psDto.price,
      psCategories,
    );

    const results = await this.productServiceService.createProductService(
      productService,
    );
    if (!results) {
      throw new HttpException(
        'Failed to add service or product',
        HttpStatus.BAD_REQUEST,
      );
    }
    return results;
  }
}
