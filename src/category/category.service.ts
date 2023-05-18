import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dtos/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories not found');
    }
    return categories;
  }

  async createCategory(
    createCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(createCategory.name).catch(
      () => undefined,
    );

    if (category) {
      throw new BadRequestException(
        `Category ${createCategory.name} already exists.`,
      );
    }
    return this.categoryRepository.save(createCategory);
  }

  async findCategoryByName(categoryName: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        name: categoryName,
      },
    });
    if (!category) {
      throw new NotFoundException(`Category ${categoryName} not found.`);
    }
    return category;
  }

  async findCategoryById(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException(`CategoryId ${categoryId} not found.`);
    }
    return category;
  }
}
