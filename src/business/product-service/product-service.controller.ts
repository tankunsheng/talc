import {
  Controller,
  Put,
  Body,
  Get,
  Req,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { productServiceDto } from '../../dto/productServiceDto';
import { ProductService, ProductServiceToCategory } from '../../entities';
import { ProductServiceService } from './product-service.service';

@Controller('business/product-service')
export class ProductServiceController {
  constructor(private productServiceService: ProductServiceService) {}
  @Get(':category')
  async listAll(@Param() params): Promise<ProductServiceToCategory[]> {
    return this.productServiceService.listAllByCategory(params.category);
  }

  @Get(':businessId/:productServiceName')
  async getProductServiceInfo(@Param() params): Promise<ProductService> {
    return this.productServiceService.getProductServiceInfo(
      params.businessId,
      params.productServiceName,
    );
  }

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
