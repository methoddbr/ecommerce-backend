import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreatedAddressDto } from './dtos/createAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';
@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addresRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}
  async createAddress(
    createdAddressDto: CreatedAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createdAddressDto.cityId);

    return this.addresRepository.save({
      ...createdAddressDto,
      userId,
    });
  }

  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    const addresses = await this.addresRepository.find({
      where: {
        userId,
      },
      relations: {
        city: {
          state: true,
        },
      },
    });

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException(`Addresses not found for userId: ${userId}`);
    }
    return addresses;
  }
}
