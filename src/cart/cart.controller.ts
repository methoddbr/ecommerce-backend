import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/enum-type.enum';
import { InsertCartDto } from './dtos/insertCart.dto';
import { CartService } from './cart.service';
import { UserId } from '../decorators/user-id.decoreator';
import { ReturnCartDto } from './dtos/returnCart.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @UsePipes(ValidationPipe)
  @Post()
  async insertProductToCart(
    @Body() inserCart: InsertCartDto,
    @UserId() userId: number,
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.insertProductToCart(inserCart, userId),
    );
  }
}
