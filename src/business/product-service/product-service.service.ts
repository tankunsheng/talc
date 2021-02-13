import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService, ProductServiceToCategory } from '../../entities';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

// https://stackabuse.com/uploading-files-to-aws-s3-with-node-js/
@Injectable()
export class ProductServiceService {
  constructor(
    @InjectRepository(ProductService)
    private productServiceRepo: Repository<ProductService>,
    @InjectRepository(ProductServiceToCategory)
    private psToCategory: Repository<ProductServiceToCategory>,
    private configService: ConfigService,
  ) {}

  async listAllByCategory(
    category: string,
  ): Promise<ProductServiceToCategory[]> {
    let result: ProductServiceToCategory[];
    try {
      result = await this.psToCategory.find({
        relations: ['productService', 'productService.business'],
        where: { catName: category },
      });
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  async getProductServiceInfo(
    businessId: string,
    productServiceName: string,
  ): Promise<ProductService> {
    let result: ProductService;
    try {
      result = await this.productServiceRepo.findOne({
        where: {
          businessId: businessId,
          name: productServiceName,
        },
      });
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  async uploadImagesProductService(
    files,
    businessId: string,
    producServiceName: string,
  ) {
    console.log(files);
    const imageUploadPromises = files.map(async (eachFile) => {
      const params = {
        Bucket: 'talc-dev',
        Key: `${businessId}/${producServiceName}/${eachFile.originalname}`, // File name you want to save as in S3
        Body: eachFile.buffer,
      };
      console.log(this.configService.get('DYNAMODB_SESSIONS_ACCESS_KEY_ID'));
      console.log(
        this.configService.get('DYNAMODB_SESSIONS_SECRET_ACCESS_KEY'),
      );
      const s3 = new S3({
        accessKeyId: this.configService.get('DYNAMODB_SESSIONS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get(
          'DYNAMODB_SESSIONS_SECRET_ACCESS_KEY',
        ),
      });
      return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
          if (err) {
            return reject(err);
          }
          console.log(`File uploaded successfully. ${data.Location}`);
          return resolve(data);
        });
      });
    });
    const result = await Promise.all(imageUploadPromises).catch((err) => {
      console.log(err);
      throw new HttpException(
        'Failed to upload images for service or product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
    console.log(result);
    return result;
  }

  async createProductService(
    productService: ProductService,
  ): Promise<ProductService | boolean> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let success = false;
    try {
      await queryRunner.manager.save(productService);
      console.log(productService.productServiceToCategories);
      await queryRunner.manager.save(productService.productServiceToCategories);
      await queryRunner.manager.save(productService.productServiceImages);

      await queryRunner.commitTransaction();
      success = true;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return success ? productService : false;
  }
}
