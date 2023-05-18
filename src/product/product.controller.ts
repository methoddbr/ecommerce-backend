import { Controller, Get } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/enum-type.enum';
import { ReturnProductDto } from './dtos/returnProducts.dto';
import { ProductService } from './product.service';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<ReturnProductDto[]> {
    return (await this.productService.findAll()).map(
      (product) => new ReturnProductDto(product),
    );
  }
}
