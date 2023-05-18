import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }
    return products;
  }

  async createProduct(createProduct: CreateProductDto): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProduct.categoryId);
    return await this.productRepository.save(createProduct);
  }

  async findProductByName(name: string): Promise<ProductEntity> {
    const product: ProductEntity = await this.productRepository.findOne({
      where: { name },
    });

    if (!product) {
      throw new NotFoundException(`Product not found: ${name}`);
    }
    return product;
  }
}
