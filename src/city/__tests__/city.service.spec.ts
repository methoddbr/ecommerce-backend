import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { cityMock } from '../__mocks__/city.mock';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';
import { CacheService } from '../../cache/cache.service';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([cityMock]),
            findOne: jest.fn().mockResolvedValue(cityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should be return city on findCityById', async () => {
    const city = await service.findCityById(cityMock.id);
    expect(city).toEqual(cityMock);
  });

  it('should be return error when findCityById return not found', async () => {
    jest.spyOn(cityRepository, 'findOne').mockRejectedValueOnce(new Error());
    expect(service.findCityById(cityMock.id)).rejects.toThrowError();
  });

  it('should be return cities on getAllCitiesByStateId', async () => {
    const city = await service.getAllCitiesByStateId(cityMock.id);
    expect(city).toEqual([cityMock]);
  });
});
