import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertCartDto } from './dtos/insertCart.dto';
import { CartProductService } from '../cart-product/cart-product.service';
import { UpdateCartDto } from './dtos/updateCart.dto copy';

const LINE_AFFECTED = 1;
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}
  async findCartByUserId(userId: number, isRelations?: boolean) {
    const relations = isRelations
      ? {
          cartProduct: {
            product: true,
          },
        }
      : undefined;
    const cart = await this.cartRepository.findOne({
      where: {
        userId,
        active: true,
      },
      relations,
    });
    if (!cart) {
      throw new NotFoundException(`Cart active not found`);
    }
    return cart;
  }

  async createCart(userId: number): Promise<CartEntity> {
    return this.cartRepository.save({
      active: true,
      userId,
    });
  }

  async insertProductToCart(
    insertCartDto: InsertCartDto,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.insertProductInCart(insertCartDto, cart);
    return cart;
  }

  async clearCart(userId: number): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userId);
    await this.cartRepository.save({
      ...cart,
      active: false,
    });
    return {
      raw: [],
      affected: LINE_AFFECTED,
    };
  }

  async deleteProductCart(
    productId: number,
    userId: number,
  ): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userId);
    return this.cartProductService.deleteProductCart(productId, cart.id);
  }

  async updateProductInCart(
    updateCartDto: UpdateCartDto,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.updateProductInCart(updateCartDto, cart);
    return cart;
  }
}
