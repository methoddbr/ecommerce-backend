import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatedAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/enum-type.enum';
import { UserId } from '../decorators/user-id.decoreator';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // @Roles(UserType.User, UserType.Admin)
  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createdAddressDto: CreatedAddressDto,
    @UserId('userId') userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createdAddressDto, userId);
  }

  @Get()
  async findAddressByUserId(
    @UserId('userId') userId: number,
  ): Promise<ReturnAddressDto[]> {
    return (await this.addressService.findAddressByUserId(userId)).map(
      (address) => new ReturnAddressDto(address),
    );
  }
}
