import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreatedAddressDto } from './dtos/createAddress.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';

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
}
