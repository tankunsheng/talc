import {
  Controller,
  Put,
  Body,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { productServiceDto } from '../../dto/productServiceDto';
import {
  ProductService,
  ProductServiceToCategory,
  ProductServiceImage,
} from '../../entities';
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

  @Post(':businessId/:productServiceName')
  @UseInterceptors(FilesInterceptor('images'))
  async postImagesToProductServices(@Param() params, @UploadedFiles() files) {
    let result;
    try {
      result = await this.productServiceService.uploadImagesProductService(
        files,
        params.businessId,
        params.productServiceName,
      );
    } catch (err) {
      throw err;
    }
    return result;
  }

  //TODO send bussinessId as path parameter instead of body
  @Put()
  async putProfile(@Body() psDto: productServiceDto) {
    // console.log(psDto);
    // console.log(psDto);
    const psCategories: ProductServiceToCategory[] = psDto.categories.map(
      (eachPSCat) => {
        return new ProductServiceToCategory(
          psDto.businessId,
          psDto.name,
          eachPSCat,
        );
      },
    );
    const psImages: ProductServiceImage[] = psDto.imageLinks.map(
      (eachImageLink) => {
        return new ProductServiceImage(
          psDto.businessId,
          psDto.name,
          eachImageLink,
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
      psImages,
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
