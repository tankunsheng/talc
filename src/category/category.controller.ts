import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../entities';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('list')
  async listAll(): Promise<Category[]> {
    return this.categoryService.listAllCategories();
  }
}
