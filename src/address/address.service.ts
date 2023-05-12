import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreatedAddressDto } from './dtos/createAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addresRepository: Repository<AddressEntity>,
  ) {}
  async createAddress(
    createdAddressDto: CreatedAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    return this.addresRepository.save({
      ...createdAddressDto,
      userId,
    });
  }
}
