import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/enum-type.enum';
import { CartEntity } from './entities/cart.entity';
import { InserCartDto } from './dtos/insertCart.dto';
import { CartService } from './cart.service';
import { UserId } from '../decorators/user-id.decoreator';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @UsePipes(ValidationPipe)
  @Post()
  async insertProductToCart(
    @Body() inserCart: InserCartDto,
    @UserId() userId: number,
  ): Promise<CartEntity> {
    return this.cartService.insertProductToCart(inserCart, userId);
  }
}
