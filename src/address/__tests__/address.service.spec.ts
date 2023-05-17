import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressEntity } from '../entities/address.entity';
import { AddressService } from '../address.service';
import { UserService } from '../../user/user.service';
import { CityService } from '../../city/city.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { cityMock } from '../../city/__mocks__/city.mock';
import { createdAddressDtoMock } from '../__mocks__/createAddress.mock';
import { addressMock } from '../__mocks__/address.mock';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
            find: jest.fn().mockResolvedValue([addressMock]),
          },
        },
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn().mockResolvedValue(cityMock),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(addressRepository).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
  });

  it('should return address when save sucessfully', async () => {
    const address = await service.createAddress(
      createdAddressDtoMock,
      userEntityMock.id,
    );
    expect(address).toEqual(addressMock);
  });

  it('should return error if exception in userService', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());

    expect(
      service.createAddress(createdAddressDtoMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return error if exception in cityService', async () => {
    jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());

    expect(
      service.createAddress(createdAddressDtoMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return user addresses', async () => {
    const addresses = await service.findAddressByUserId(userEntityMock.id);

    expect(addresses).toEqual([addressMock]);
  });

  it('should return not found if user haven´t addresses', async () => {
    jest.spyOn(addressRepository, 'find').mockResolvedValue(undefined);

    expect(
      service.findAddressByUserId(userEntityMock.id),
    ).rejects.toThrowError();
  });
});
